import { Component } from '@angular/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ResumenGeneralComponent } from './resumen-general/resumen-general.component';
import DistribucionComponent from "./distribucion/distribucion.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    ResumenGeneralComponent,
    DistribucionComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default default class DashboardComponent {
  fechaActual: Date = new Date();
}
