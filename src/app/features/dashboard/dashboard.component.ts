import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    // MatHint,
    MatDatepickerModule,
    MatCardModule,
    //DatePipe,
    ResumenGeneralComponent,
    SolicitudesGestionadasComponent,
    DistribucionComponent,
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export default class DashboardComponent {
  fechaActual: Date = new Date();
}
