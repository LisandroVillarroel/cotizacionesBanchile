import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Necesario para ngModel

// Angular Material
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

// PrimeNG
import { ChartModule } from 'primeng/chart';

// Componentes personalizados
import { GraficoPieComponent } from './grafico-pie/grafico-pie.component';
import { GraficoBarraComponent } from './grafico-barra/grafico-barra.component';


@Component({
  selector: 'app-distribucion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Agregado para que ngModel funcione
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOptionModule,
    ChartModule,
    GraficoPieComponent,
    GraficoBarraComponent
  ],
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css'] // ✅ Corrección: debe ser "styleUrls" (plural)
})



export default class DistribucionComponent {
opciones = [
    { id: 1, nombre: 'Automotriz' },
    { id: 2, nombre: 'Hogar' },
    { id: 3, nombre: 'Vida' }
  ];
  seleccionada = null;
}






