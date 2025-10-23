import { CommonModule } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
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
import { CotizacionesPendientesComponent } from './cotizaciones-pendientes/cotizaciones-pendientes.component';
import { CotizacionesEnviadasComponent } from './cotizaciones-enviadas/cotizaciones-enviadas.component';
import { CotizacionesRecibidasComponent } from './cotizaciones-recibidas/cotizaciones-recibidas.component';
import { PropuestasFirmadasComponent } from './propuestas-firmadas/propuestas-firmadas.component';

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
    CotizacionesPendientesComponent,
    CotizacionesEnviadasComponent,
    CotizacionesRecibidasComponent,
    PropuestasFirmadasComponent
  ],
  styleUrls: ['./gestion-cotizaciones.component.css']
})
export default class GestionCotizacionesComponent{
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin.usuario!;
  tipo_usuario = (this.id_usuario.substring(0,1))?.toUpperCase()!;

  gestionService = inject(GestionCotizacionesService)
  resumenGestion = signal<IResumenCotizaciones>({
    recibidas: 0,
    pendientes: 0,
    enviadas: 0,
    firmadas: 0
  });
  recibidas = signal<IGestionCotizacion[] >([]);
  pendientes = signal<IGestionCotizacion[] >([]);
  enviadas = signal<IGestionCotizacion[] >([]);
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

    this.gestionService.postListadoSolicitudes(entrada).subscribe({
      next: (dato: IGestionResponse) => {
        if (dato.codigo === 200) {
          this.resumenGestion.set({
            recibidas: dato.p_cotizaciones_recibidas,
            pendientes: dato.p_cotizaciones_pendientes,
            enviadas: dato.p_solicitudes_cotizadas,
            firmadas: dato.p_solicitudes_firmadas
          });
          this.pendientes.set(dato.pp_cursor);
          this.enviadas.set(dato.pc_cursor);
          this.recibidas.set(dato.pr_cursor);
          this.firmadas.set(dato.pf_cursor);
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
