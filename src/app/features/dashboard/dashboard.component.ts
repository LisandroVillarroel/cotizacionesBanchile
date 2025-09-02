import { Component } from '@angular/core';
import { MatDivider } from "@angular/material/divider";
import { MatLabel, MatHint } from "@angular/material/form-field";
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ResumenGeneralComponent } from './resumen-general/resumen-general.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDivider, MatFormFieldModule, MatInputModule, MatLabel, MatHint, MatDatepickerModule,
     MatCardModule,DatePipe, ResumenGeneralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  fechaActual: Date = new Date();
}
