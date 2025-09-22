import { Component, signal } from '@angular/core';
import { MatLabel, MatHint } from "@angular/material/form-field";
import { MatDatepickerModule} from '@angular/material/datepicker';
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
    fechaActual= new FormControl<Date>(new Date());


    seleccionaFecha(){

    //  console.log('fecha', this.fechaActual.value?.toISOString().split('T')[0]); // yyyy-mm-dd
    //  console.log('fecha 2', this.fechaActual.value?.toLocaleDateString('es-CL')); // dd/mm/yyyy
      const fechaFiltrar=this.fechaActual.value?.toLocaleDateString('es-CL');
    }

}
