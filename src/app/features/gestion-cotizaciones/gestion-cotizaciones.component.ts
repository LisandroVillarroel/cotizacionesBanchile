import { CommonModule } from '@angular/common';
import { Component, computed, inject, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { GestionCotizacionesService } from './gestion-cotizaciones.service';
import { IGestionCotizacion, IGestionResponse, IRequestGestion, IResumenCotizaciones } from './gestionCotizacion-interface';
import { ResumenCotizacionesComponent } from './resumen-cotizaciones/resumen-cotizaciones.component';
import { PropuestasFirmadasComponent } from './propuestas-firmadas/propuestas-firmadas.component';
import { CotizacionesRegistradasComponent } from './cotizaciones-registradas/cotizaciones-registradas.component';
import { PropuestasPendientesComponent } from './propuestas-pendientes/propuestas-pendientes.component';
import { PropuestasEmitidasComponent } from "./propuestas-emitidas/propuestas-emitidas.component";

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
    CotizacionesRegistradasComponent,
    PropuestasPendientesComponent,
    PropuestasEmitidasComponent,
    PropuestasFirmadasComponent,
    PropuestasEmitidasComponent
],
  styleUrls: ['./gestion-cotizaciones.component.css']
})
export default class GestionCotizacionesComponent{
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin.usuario!;
  tipo_usuario = this._storage()?.usuarioLogin.tipoUsuario!;

  gestionService = inject(GestionCotizacionesService)
  resumenGestion = signal<IResumenCotizaciones>({
    recibidas: 0,
    pendientes: 0,
    emitidas: 0,
    firmadas: 0
  });
  solicitudes = signal<IGestionCotizacion[] >([]);
  recibidas = signal<IGestionCotizacion[] >([]);
  pendientes = signal<IGestionCotizacion[] >([]);
  emitidas = signal<IGestionCotizacion[] >([]);
  firmadas = signal<IGestionCotizacion[] >([]);

  async ngOnInit(){
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    var entrada: IRequestGestion;
    entrada = {
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipo_usuario
    };
    console.log("Entradas: ", entrada)
    this.gestionService.postListadoSolicitudes(entrada).subscribe({
      next: (dato: IGestionResponse) => {
        if (dato.codigo === 200) {
          console.log("Datos: ", dato)
          this.resumenGestion.set({
            recibidas: dato.p_nro_cotiz_reg,
            pendientes: dato.p_nro_prop_pend,
            emitidas: dato.p_nro_prop_gene,
            firmadas: dato.p_nro_prop_firm
          });
          let res = dato.ps_cursorRec;
          res.map((valor: IGestionCotizacion)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              nombre_contratante: (valor.p_nombre_contratante === null ||
                valor.p_nombre_contratante ==="") ? "-" : valor.p_nombre_contratante
            }
          });
          this.recibidas.set(res);

          let res2 = dato.ps_cursorPen;
          res.map((valor: IGestionCotizacion)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              nombre_contratante: (valor.p_nombre_contratante === null ||
                valor.p_nombre_contratante ==="") ? "-" : valor.p_nombre_contratante
            }
          });
          this.pendientes.set(res2);

          let res3 = dato.ps_cursorProGen;
          res.map((valor: IGestionCotizacion)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              nombre_contratante: (valor.p_nombre_contratante === null ||
                valor.p_nombre_contratante ==="") ? "-" : valor.p_nombre_contratante
            }
          });
          this.emitidas.set(res3);

          let res4 = dato.ps_cursorProFir;
          res.map((valor: IGestionCotizacion)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              nombre_contratante: (valor.p_nombre_contratante === null ||
                valor.p_nombre_contratante ==="") ? "-" : valor.p_nombre_contratante
            }
          });
          this.firmadas.set(res4);
          //console.log('rescata listadoSolicitudes:', this.listadoSolicitudes());
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
      },
    });
  }

  msj = false;
  recibido(msj: boolean){
    if(msj){
      this.cargarSolicitudes();
    }
  }
}
