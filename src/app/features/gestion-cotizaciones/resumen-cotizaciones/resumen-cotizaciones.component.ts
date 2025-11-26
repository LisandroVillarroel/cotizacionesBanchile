import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IResumenCotizaciones } from '../gestionCotizacion-interface';

@Component({
  selector: 'app-resumen-cotizaciones',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './resumen-cotizaciones.component.html',
  styleUrls: ['./resumen-cotizaciones.component.css']
})
export class ResumenCotizacionesComponent{
  inResumen = input.required<IResumenCotizaciones | undefined>();
  resumenGestion = computed(()=> this.inResumen());
}
