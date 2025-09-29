import { Component, inject, signal, OnInit } from '@angular/core';
import { MatLabel, MatHint } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
//import { DatePipe } from '@angular/common';
import { ResumenGeneralComponent } from './resumen-general/resumen-general.component';
import { SolicitudesGestionadasComponent } from './solicitudes-gestionadas/solicitudes-gestionadas.component';
import DistribucionComponent from './distribucion/distribucion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { DatosSolicitudesInterface, IListadoSolicitudes, IResumenSolicitudes } from './datosSolicitud-Interface';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

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
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export default class DashboardComponent   {
  fechaActual = new FormControl<Date>(new Date());

  dashboardService = inject(DashboardService)

  resumenGeneral = signal<IResumenSolicitudes | undefined>(undefined);
  listadoSolicitudes = signal<IListadoSolicitudes[] | undefined>(undefined);

  async ngOnInit(){
    this.seleccionaFecha();
  }

  seleccionaFecha() {
    //console.log('fecha 2', this.fechaActual.value?.toLocaleDateString('es-BO')); // dd/mm/yyyy
    const fechaFiltrar = this.fechaActual.value?.toLocaleDateString('es-BO');
    const estructura_listaSolicitudes = {
      //"p_id_usuario": "CO001",
      "p_id_usuario": "EJ001",
      //"p_id_usuario": "EJ002",
      "p_fecha": fechaFiltrar,
      "p_tipo_usuario": "E"
    }
    //console.log('estructura_listaSolicitudes', estructura_listaSolicitudes);
    this.dashboardService.postListadoSolicitudes(estructura_listaSolicitudes).subscribe({
      next: (dato: any) => {
        if (dato.codigo === 200) {
          this.resumenGeneral.set({
            vcEstado: dato.vcEstado,
            vcEstadoCreacion: dato.vcEstadoCreacion,
            p_EnProceso: dato.p_EnProceso,
            p_EsperandoRespuesta: dato.p_EsperandoRespuesta,
            p_Aprobadas: dato.p_Aprobadas,
            p_ConObservaciones: dato.p_ConObservaciones
          });
          this.listadoSolicitudes.set(dato.p_cursor);
          //console.log('rescata Datos:', dato)
          //console.log('rescata listadoSolicitudes:', this.listadoSolicitudes());
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
      },
    });
    // this.truncarFechas();
  }

}
