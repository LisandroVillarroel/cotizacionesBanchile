import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { GestionCotizacionesService } from './gestion-cotizaciones.service';

import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { ICotizacionesxEstado, IGestionCotizacion, IGestionResponse, IResumenCotizaciones } from './gestionCotizacion-interface';

import { ResumenCotizacionesComponent } from './resumen-cotizaciones/resumen-cotizaciones.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';

@Component({
  selector: 'app-gestion-cotizaciones',
  templateUrl: './gestion-cotizaciones.component.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    CommonModule,
    ResumenCotizacionesComponent,
    CotizacionesComponent,
],
  styleUrls: ['./gestion-cotizaciones.component.css']
})
export default class GestionCotizacionesComponent implements OnInit {
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin?.usuario;
  tipo_usuario = this._storage()?.usuarioLogin?.tipoUsuario;
  ejec = signal<boolean>(false);

  gestionService = inject(GestionCotizacionesService)
  resumenGestion = signal<IResumenCotizaciones>({
    recibidas: 0,
    aceptadas: 0,
    emitidas: 0,
    firmadas: 0,
    por_firmar: 0
  });
  solicitudes = signal<IGestionCotizacion[] >([]);
  recibidas = signal<ICotizacionesxEstado | undefined>(undefined);
  aceptadas = signal<ICotizacionesxEstado | undefined>(undefined);
  emitidas = signal<ICotizacionesxEstado | undefined>(undefined);
  firmadas = signal<ICotizacionesxEstado | undefined>(undefined);
  por_firmar = signal<ICotizacionesxEstado | undefined>(undefined);

  ngOnInit(){
    if(this.tipo_usuario === "E"){
      this.ejec.set(true);
    }else{
      this.ejec.set(false);
    }
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const entrada = {
      p_id_usuario: this.id_usuario ?? "",
      p_tipo_usuario: this.tipo_usuario ?? ""
    };
    this.gestionService.postListadoSolicitudes(entrada).subscribe({
      next: (dato: IGestionResponse) => {
        if (dato.codigo === 200) {
          this.resumenGestion.set({
            recibidas: dato.p_nro_cotiz_reg,
            aceptadas: dato.p_nro_prop_pend,
            emitidas: dato.p_nro_prop_gene,
            por_firmar: dato.p_nro_prop_FirPen,
            firmadas: dato.p_nro_prop_firm,
          });
          this.recibidas.set({
            cotizaciones: this.cargaLista(dato.ps_cursorRec),
            estado: 'recibida',
          });
          this.aceptadas.set({
            cotizaciones: this.cargaLista(dato.ps_cursorPen),
            estado: 'pendiente',
          });
          this.emitidas.set({
            cotizaciones: this.cargaLista(dato.ps_cursorProGen),
            estado: 'emitida',
          });
          this.por_firmar.set({
            cotizaciones: this.cargaLista(dato.ps_cursorFirPen),
            estado: 'firma pendiente',
          });
          this.firmadas.set({
            cotizaciones: this.cargaLista(dato.ps_cursorProFir),
            estado: 'firmada',
          });
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener listado de cotizaciones.');
      },
    });
  }

  private cargaLista(lista: IGestionCotizacion[] | undefined): IGestionCotizacion[] {
    if (!Array.isArray(lista)) return [];
    return lista.map((valor: IGestionCotizacion) => ({
      ...valor,
      nombre_contratante: (valor.p_nombre_contratante === null || valor.p_nombre_contratante === "") ? "-" : valor.p_nombre_contratante
    }));
  }

  msj = false;
  recibido(msj: boolean){
    if(msj){
      this.cargarSolicitudes();
    }
  }
}
