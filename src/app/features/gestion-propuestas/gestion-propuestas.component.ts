import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';
import { PropuestasService } from './propuestas.service';
import { MatTabsModule } from '@angular/material/tabs';
import { PropuestasEmitidasComponent } from '@features/gestion-cotizaciones/propuestas-emitidas/propuestas-emitidas.component';
import { IGestionCotizacion } from '@features/gestion-cotizaciones/gestionCotizacion-interface';
import { FirmaPendienteComponent } from './firma-pendiente/firma-pendiente.component';

@Component({
  selector: 'app-gestion-propuestas',
  templateUrl: './gestion-propuestas.component.html',
  styleUrls: ['./gestion-propuestas.component.css'],
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
    PropuestasEmitidasComponent,
    FirmaPendienteComponent
  ],
})
export default class GestionPropuestasComponent {
  fechaActual: Date = new Date();
  datosSolicitud = signal<IGestionCotizacion[]>([]);
  //solicitudes = computed(()=> this.datosSolicitud());

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  propuestasService = inject(PropuestasService);

  emitidas = computed(() => { return this.datosSolicitud().filter( r =>
    r.p_nombre_estado?.toLowerCase()?.includes("emitida"))
  });

  pendientes = computed(() => { return this.datosSolicitud()!.filter(r =>
    r.p_nombre_estado?.toLowerCase()?.includes("firma pendiente"))
  });

  async ngOnInit(){
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const request = {
      p_id_usuario:  this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!
    };
    this.propuestasService.postPropuestas(request).subscribe({
      next: (dato: any) => {
        if (dato.codigo === 200) {
          let res = dato.ps_cursor;
          res.map((valor: IGestionCotizacion)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              selected: false
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
