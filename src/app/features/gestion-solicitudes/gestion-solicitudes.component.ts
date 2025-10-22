import { Component, signal, inject, computed } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from "@angular/material/tooltip";
import { NuevasComponent } from './nuevas/nuevas.component';
import { ConObservacionesComponent } from './con-observaciones/con-observaciones.component';
import { ISolicitudG } from './gestionSolicitud-interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { GestionSolicitudesService } from './gestion-solicitudes.service';
import { EnCotizacionComponent } from './en-cotizacion/en-cotizacion.component';

@Component({
  selector: 'app-gestion-solicitudes',
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
    NuevasComponent,
    ConObservacionesComponent,
    EnCotizacionComponent
  ],
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.css'
})
export default class GestionSolicitudesComponent {
  fechaActual: Date = new Date();
  datosSolicitud = signal<ISolicitudG[]>([]);
  //solicitudes = computed(()=> this.datosSolicitud());

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  gestionService = inject(GestionSolicitudesService);

  nuevas = computed(() => { return this.datosSolicitud().filter( r =>
    r.nombre_estado_solicitud?.toLowerCase()?.includes("revision"))
  });

  devueltas = computed(() => { return this.datosSolicitud()!.filter(r =>
    r.nombre_estado_solicitud?.toLowerCase()?.includes("devuelta"))
  });

  cotizadas = computed(() => { return this.datosSolicitud()!.filter(r =>
    r.nombre_estado_solicitud?.toLowerCase()?.includes("cotizacion"))
  });

  async ngOnInit(){
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const request = {
      p_id_usuario:  this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: (this._storage()?.usuarioLogin.perfilUsuario)
    };
    this.gestionService.postListaGestion(request).subscribe({
      next: (dato: any) => {
        if (dato.codigo === 200) {
          let res = dato.ps_cursor;
          res.map((valor: ISolicitudG)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              nombre_contratante: (valor.nombre_contratante === null ||
                valor.nombre_contratante ==="") ? "-" : valor.nombre_contratante
            }
          })
          this.datosSolicitud.set(res);
        }
      }
    });
  }

  msj = false;
  recibido(msj: boolean){
    if(msj){
      this.cargarSolicitudes();
    }
  }

}
