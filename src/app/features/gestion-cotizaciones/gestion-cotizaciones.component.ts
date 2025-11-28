import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { IGestionCotizacion, IGestionResponse, IResumenCotizaciones } from './gestionCotizacion-interface';

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
export default class GestionCotizacionesComponent{
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
  recibidas = signal<IGestionCotizacion[] >([]);
  aceptadas = signal<IGestionCotizacion[] >([]);
  emitidas = signal<IGestionCotizacion[] >([]);
  firmadas = signal<IGestionCotizacion[] >([]);
  por_firmar = signal<IGestionCotizacion[] >([]);

  async OnInit(){
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
            firmadas: dato.p_nro_prop_firm,
            por_firmar: dato.p_nro_prop_firm_pend
          });
          this.recibidas.set(this.cargaLista(dato.ps_cursorRec));
          this.aceptadas.set(this.cargaLista(dato.ps_cursorPen));
          this.emitidas.set(this.cargaLista(dato.ps_cursorProGen));
          this.por_firmar.set(this.cargaLista(dato.ps_cursorPorFir));
          this.firmadas.set(this.cargaLista(dato.ps_cursorProFir));
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener  listado de cotizaciones.');
      },
    });
  }

  private cargaLista(lista: IGestionCotizacion[]): IGestionCotizacion[]{
    lista.map((valor: IGestionCotizacion)=> {
      return {
        ...valor, // Copiamos las propiedades originales
        nombre_contratante: (valor.p_nombre_contratante === null ||
          valor.p_nombre_contratante ==="") ? "-" : valor.p_nombre_contratante
      }
    });

    return lista;
  }

  msj = false;
  recibido(msj: boolean){
    if(msj){
      this.cargarSolicitudes();
    }
  }
}
