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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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

export default class DashboardComponent {

  fechaActual = new FormControl<Date>(new Date());

  dashboardService = inject(DashboardService)

  resumenGeneral = signal<IResumenSolicitudes | undefined>(undefined);
  listadoSolicitudes = signal<IListadoSolicitudes[] | undefined>(undefined);

  OnInit(): void {
    this.seleccionaFecha();
  }

  seleccionaFecha() {

    //  console.log('fecha', this.fechaActual.value?.toISOString().split('T')[0]); // yyyy-mm-dd
    console.log('fecha 2', this.fechaActual.value?.toLocaleDateString('es-BO')); // dd/mm/yyyy
    const fechaFiltrar = this.fechaActual.value?.toLocaleDateString('es-BO');
    const estructura_listaSolicitudes = {
      p_id_ejecutivo_banco: "LISANDRO VILLARROEL",
      p_fecha: fechaFiltrar
    }
    console.log('estructura_listaSolicitudes', estructura_listaSolicitudes);
    this.dashboardService.postListadoSolicitudes(estructura_listaSolicitudes).subscribe({
      next: (dato: DatosSolicitudesInterface) => {
        if (dato.codigo === 200) {
          this.resumenGeneral.set({
            vcEstado: dato.vcEstado,
            vcEstadoCreacion: dato.vcEstadoCreacion,
            cantidad: 0,
            p_EnProceso: dato.p_EnProceso,
            p_EsperandoRespuesta: dato.p_EsperandoRespuesta,
            p_Aprobadas: dato.p_Aprobadas
          });
          this.listadoSolicitudes.set(dato.p_cursor);
          console.log('rescata Datos:', dato)
          console.log('rescata listadoSolicitudes:', this.listadoSolicitudes());
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
  }

}
