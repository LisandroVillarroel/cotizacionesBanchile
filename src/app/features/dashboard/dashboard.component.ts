//import { es } from '@angular/common/locales/es';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatLabel } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ResumenGeneralComponent } from './resumen-general/resumen-general.component';
import { SolicitudesGestionadasComponent } from './solicitudes-gestionadas/solicitudes-gestionadas.component';
import DistribucionComponent from './distribucion/distribucion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { DatosSolicitudesInterface, IListadoSolicitudes, IResumenSolicitudes } from './datosSolicitud-Interface';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS),],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatDatepickerModule,
    MatCardModule,
    ResumenGeneralComponent,
    SolicitudesGestionadasComponent,
    DistribucionComponent,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export default class DashboardComponent implements OnInit {
  fechaActual = new FormControl<Date>(new Date());
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  dashboardService = inject(DashboardService)
  resumenGeneral = signal<IResumenSolicitudes>({
    p_EnProceso: 0,
    p_EsperandoRespuesta: 0,
    p_Aprobadas: 0,
    p_ConObservaciones: 0
  });
  listadoSolicitudes = signal<IListadoSolicitudes[]>([]);

  tipoUsuario = this._storage()?.usuarioLogin?.tipoUsuario;

  ngOnInit() {
    this.seleccionaFecha();
  }

  seleccionaFecha() {
    let fechaFiltrar: string | undefined;
    const fechaValue = this.fechaActual.value;
    console.log('fechaValue inicial:', fechaValue);
    // Forzar conversión a Date
    const fechaDate = new Date(fechaValue as Date);
    console.log('fechaValue inicial:', fechaValue);
    if (!isNaN(fechaDate.getTime())) {
      fechaFiltrar = fechaDate.toLocaleDateString('es-BO');
    } else {
      fechaFiltrar = undefined;
    }

    console.log('fechaValue:', fechaValue);
    console.log('fechaFiltrar:', fechaFiltrar);
    const estructura_listaSolicitudes = {
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_fecha: fechaFiltrar ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? ""
    }
    this.dashboardService.postListadoSolicitudes(estructura_listaSolicitudes).subscribe({
      next: (dato: DatosSolicitudesInterface) => {
        if (dato.codigo === 200) {
          this.resumenGeneral.set({
            p_EnProceso: dato.p_EnProceso,
            p_EsperandoRespuesta: dato.p_EsperandoRespuesta,
            p_Aprobadas: dato.p_Aprobadas,
            p_ConObservaciones: dato.p_ConObservaciones
          });
          if (this.tipoUsuario === "C") {
            const listadoFiltrado = dato.p_cursor.filter((item: IListadoSolicitudes) => {
              //console.log('Listado Solicitudes Coor', item);
              return !item.descripcion_estado?.toLowerCase().includes("edicion");
            });
            this.listadoSolicitudes.set(listadoFiltrado);
          } else {
            this.listadoSolicitudes.set(dato.p_cursor);
          }
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  msj = false;
  recibido(msj: boolean) {
    if (msj) {
      this.seleccionaFecha();
    }
  }
}
