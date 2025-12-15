import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { IListadoSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { MatOptionModule } from "@angular/material/core";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-grafico-pie',
  standalone: true,
  imports: [MatCardModule, ChartModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './grafico-pie.component.html',
  styleUrls: ['./grafico-pie.component.css'],
})

export class GraficoPieComponent implements OnInit {
  datosSolicitudGraficoPie = input.required<IListadoSolicitudes[]>();
  datosSolicitudGraficoPie_Recibe = computed(() => this.datosSolicitudGraficoPie())
  data = computed(() => {
    const labels: string[] = [];
    const dataValues: number[] = [];
    const backgroundColors: string[] = [];
    const solicitudes = this.datosSolicitudGraficoPie_Recibe();
    if (!solicitudes || solicitudes.length === 0) {
      return {
        labels: ['NO HAY DATOS PARA MOSTRAR'],
        datasets: [
          {
            backgroundColor: ['#8021ceff'],
            data: []
          }
        ]
      };
    }
    // Agrupar y contar por id_tipo_seguro
    const conteoPorTipoSeguro = new Map<number, { nombre: string, cantidad: number }>();
    solicitudes.forEach((item) => {
      const id = item.id_tipo_seguro;
      const nombre = item.nombre_tipo_seguro;
      if (conteoPorTipoSeguro.has(id)) {
        conteoPorTipoSeguro.get(id)!.cantidad += 1;
      } else {
        conteoPorTipoSeguro.set(id, { nombre, cantidad: 1 });
      }
    });
    // Preparar datos para el gráfico
    Array.from(conteoPorTipoSeguro.entries()).forEach(([index, { nombre, cantidad }]) => {
      labels.push(nombre);
      dataValues.push(cantidad);
      backgroundColors.push(this.getColor(index));
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: dataValues
        }
      ]
    };
  });

  options = signal({});
  ngOnInit() {
    this.options.set({
      plugins: {
        legend: {
          position: 'right'
        }
      }
    });
  }
  getColor(index: number): string {
    const colores = [
      '#002464', '#149DC9', '#D11D1A', '#F45516','#776D92',
      '#C21589', '#6BAA1F', '#A6B118','#666668',
      //'#234E85', '#89CEE4', '#DCF0F7',
    ];
    return colores[index % colores.length];
  }
}
