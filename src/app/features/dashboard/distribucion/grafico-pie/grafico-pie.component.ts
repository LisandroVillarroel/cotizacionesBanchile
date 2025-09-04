import { Component, OnInit, signal } from '@angular/core';
import { UIChart } from "primeng/chart";
import { MatCard } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { MatFormField } from "@angular/material/form-field";


@Component({
  selector: 'app-grafico-pie',
  standalone: true,
  imports: [MatCardModule, ChartModule, MatFormField],
  templateUrl: './grafico-pie.component.html',
  styleUrls: ['./grafico-pie.component.css'],
})
export class GraficoPieComponent implements OnInit {
  data= signal({});
  options = signal({});

  ngOnInit() {
    this.data.set({
      labels: ['Automotríz', 'Vida', 'Hogar'],
      datasets: [
        {
          //label: 'My First dataset',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          data: [65, 80, 40]
        }
      ]
    });
this.options.set({
      plugins: {
        legend: {
          position: 'right' // 👈 Esto mueve las leyendas al lado derecho
        }
      }
    });
  }
}
