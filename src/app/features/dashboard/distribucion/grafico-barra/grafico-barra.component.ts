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
  imports: [MatCardModule, ChartModule, MatFormField],
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css'],
})
export class GraficoBarraComponent implements OnInit {
  data= signal({});
  options = signal({});

  ngOnInit() {
    this.data.set({
      labels: ['Ingreso de solicitud', 'Envío al coordinador', 'Gestión con compañías de seguros'
        , 'Recepción de la respuesta', 'Generación de la propuesta', 'Envío de la propuesta firmada', 'Proceso de emisión'],
      datasets: [
        {
          //  label: 'My First dataset',
          backgroundColor:
          [
            '#002464',
            '#666668',
            '#234E85',
            '#6BAA1F',
            '#149DC9',
            '#A6B118',
            '#89CCE4'],
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    });
    this.options.set({
      indexAxis: 'y', // ← Esto convierte el gráfico en horizontal
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          //text: 'Gráfico de Barras Horizontal'
        }
      }
    });
  }
}
