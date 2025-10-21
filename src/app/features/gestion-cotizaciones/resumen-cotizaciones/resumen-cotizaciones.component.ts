import { Component, computed, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-resumen-cotizaciones',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule
  ],
  templateUrl: './resumen-cotizaciones.component.html',
  styleUrls: ['./resumen-cotizaciones.component.css']
})
export class ResumenCotizacionesComponent{
  datoResumenGeneral = input.required<IResumenCotizaciones | undefined>();
  resumenGeneral = computed(()=> this.datoResumenGeneral());
}
