import { IListadoSolicitudes } from './../../datosSolicitud-Interface';
import { IEstado } from '@shared/modelo/estado-interface';
import { EstadoService } from '@shared/service/estado.service';
import { Component, signal, computed, input, effect, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-grafico-barra',
  standalone: true,
  imports: [MatCardModule, ChartModule],
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css'],
})
export class GraficoBarraComponent implements OnInit {
  datoResumenGeneral_Grafico = input.required<IListadoSolicitudes[] | undefined>();

  datoEstado = signal<IEstado[]>([])
  datoEstadoNombre = signal<string[]>([])
  arrTotalesSignal = signal<number[]>([])
  estadoService = inject(EstadoService);

  // Entrada de datos

  resumenGeneral = computed(() => this.datoResumenGeneral_Grafico());

  // Señales para el gráfico
  data = signal({});
  options = signal({});

  constructor() {
    effect((): void => {
      const resumen = this.resumenGeneral();
      if (!resumen) return;
      let arrTotales = []
      console.log('paso 1')
      for (let i = 0; i < this.datoEstadoNombre().length; i++) {
        console.log('this.datoEstadoNombre()[i]', this.datoEstadoNombre()[i])
        arrTotales[i] = this.resumenGeneral()!.filter(item => item.descripcion_estado.toString() === this.datoEstadoNombre()[i])
          .reduce((contador) => contador = contador + 1, 0);

      }
      this.arrTotalesSignal.set(arrTotales)
      console.log('arrTotales', arrTotales)
      console.log('Resumen cargado:', resumen);

      this.data.set({
        labels: this.datoEstadoNombre(),
        datasets: [{
          backgroundColor: ['#666668', '#149DC9', '#FFC725', '#234E85', '#0c70f1ff', '#bbec07ff', '#d31721ff', '#8021ceff', '#12a4e7ff'],
          data: this.arrTotalesSignal()//this.arrTotalesSignal()  //10,20,30,40,50,60,70,80,90,100
        }]
      });

      this.options.set({
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        }
      });
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.cargaEstado()
  }

  cargaEstado() {
    this.estadoService.getEstado().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          // this.datoEstado.set(dato.p_cursor);

          this.datoEstadoNombre.set(dato.p_cursor.map(x => x.nombre_estado)) //x.nombre_estado Obtiene solo tipodescrip
          console.log('dato.p_cursor-.', dato.p_cursor)
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
      },
    });
  }
}
