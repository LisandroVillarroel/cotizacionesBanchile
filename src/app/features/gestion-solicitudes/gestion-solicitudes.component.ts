import { Component, signal, inject, computed } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    NuevasComponent, //ConObservacionesComponent
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

  nuevas = computed(() => { return this.datosSolicitud().filter( (r) =>
    r.nombre_estado_solicitud.toLowerCase().includes("revision"))
  });

  devueltas = computed(() => { return this.datosSolicitud()!.filter(r =>
    r.nombre_estado_solicitud?.toLowerCase().includes("devuelta"))
  });

  cotizadas = computed(() => { return this.datosSolicitud()!.filter(r =>
    r.nombre_estado_solicitud?.toLowerCase().includes("cotizacion"))
  });

  async ngOnInit(){
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const request = {
      p_id_usuario:  this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.usuario!.substring(0,1)
    };
    console.log('request:', request);

    this.gestionService.postListaGestion(request).subscribe({
      next: (dato: any) => {
        console.log("Retorno servicio: ",dato);
        if (dato.codigo === 200) {
          console.log("ps_cursor ",dato.ps_cursor);
          this.datosSolicitud.set(dato.ps_cursor);
          console.log("ps_cursor ",this.datosSolicitud());
        }
      }
    });
  }
}
