import { Component, OnInit, signal } from '@angular/core';
import { UIChart } from "primeng/chart";
import { MatCard } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { MatFormField } from "@angular/material/form-field";
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-grafico-barra',
  standalone: true,
  imports: [MatCardModule, ChartModule],
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css'],
})
export class GraficoBarraComponent implements OnInit {
  data= signal({});
  options = signal({});

  ngOnInit() {
    this.data.set({
      labels: ['En edición', 'En revisión', 'Con observaciones', 'En cotización'
        , 'Aprobadas', 'Propuestas pendientes', 'Propuestas Emitidas'
        , 'Propuestas firmadas', 'Teminadas', 'Anuladas', 'Rechazadas'],
      datasets: [
        {
          //  label: 'My First dataset',
          backgroundColor:
          [
            '#666668',
            '#149DC9',
            '#FFC725',
            '#234E85',
            '#6BAA1F',
            '#776D92',
            '#002464',
            '#A6B118',
            '#C21589',
            '#F45516',
            '#D11D1A'],
          data: [2, 4, 1, 3, 6, 1, 2, 0, 0, 1, 1]
        }
      ]
    });
    this.options.set({
      indexAxis: 'y', // ← Esto convierte el gráfico en horizontal
      responsive: true,
      plugins: {
        legend: {
          position: 'none'
        },
        title: {
          display: false,
          //text: 'Gráfico de Barras Horizontal'
        }
      }
    });
  }
}
