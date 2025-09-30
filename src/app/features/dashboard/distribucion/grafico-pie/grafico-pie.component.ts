import { Component, computed, inject, input, OnInit, signal, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { MatFormField, MatLabel } from "@angular/material/form-field";

import { IListadoSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { MatSelect } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { RubroService } from '@shared/service/rubro.service';
import { EstadoService } from '@shared/service/estado.service';



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

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService);


  // data = computed(() => {
  //   const labels: string[] = [];
  //   const dataValues: number[] = [];
  //   const backgroundColors: string[] = [];

  //   const recorre=this.datosSolicitudGraficoPie_Recibe()!;

  //   recorre.forEach((item, index) => {
  //     labels.push(item.nombre_tipo_seguro); // Ajusta según la propiedad que representa el nombre
  //     dataValues.push(item.id_tipo_seguro); // ✅ si quieres convertir el string a número


  //     backgroundColors.push(this.getColor(index));
  //   });
  // if (!this.datosSolicitudGraficoPie_Recibe() || this.datosSolicitudGraficoPie_Recibe()!.length === 0) {
  //       return {
  //         labels: [],
  //         datasets: [
  //           {
  //             backgroundColor: [],
  //             data: []
  //           }
  //         ]
  //       }
  //     } else {
  //       return {
  //         labels,
  //         datasets: [
  //           {
  //             backgroundColor: backgroundColors,
  //             data: dataValues
  //           }
  //         ]
  //       }
  //     }
  // })










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
          backgroundColor: ['#F45516'],
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
  Array.from(conteoPorTipoSeguro.entries()).forEach(([id, { nombre, cantidad }], index) => {
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

  seguro = new FormControl();
  rubro = new FormControl();

  datoRubros = signal<any[]>([]);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);
  listadoSolicitudes = signal<IListadoSolicitudes[] | undefined>(undefined);




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
      '#F45516', '#DCF0F7', '#D11D1A', '#4BC0C0',
      '#9966FF', '#FF9F40', '#C9CBCF', '#36A2EB'
    ];
    return colores[index % colores.length];
  }


}
