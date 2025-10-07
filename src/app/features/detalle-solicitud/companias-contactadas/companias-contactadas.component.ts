import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompania } from '../detalle-interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-companias-contactadas',
  templateUrl: './companias-contactadas.component.html',
  styleUrls: ['./companias-contactadas.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIcon,
    CommonModule
  ]
})
export class CompaniasContactadasComponent implements OnInit {
  panelOpenState = false;
  idSolicitud = input.required<number>();
  //companias = input.required<ICompania[] | undefined>();
  companias = signal<ICompania[]>([]);
  compFiltradas = computed(()=> this.companias());

  constructor() { }

  async ngOnInit(){
    this.cargarCompanias(this.idSolicitud);
  }

  cargarCompanias(idSolicitud: any){
/*      this.consultarCompanias.postCompanias(idSolicitud).subscribe({
      next: (dato: ICompania) => {
        if (dato.codigo === 200) {
          this.companias.set({
            id_solicitud : this.idSolicitud,
            id_compania: dato.id_compania,
            nombre_compania: dato.nombre_compania,
            correo_destino: dato.correo_destino,
            fecha_envio: dato.fecha_envio,
            tiempo_transc: dato.tiempo_transc,
            id_estado_cot: dato.id_estado_cot,
            estado_cotizacion: dato.estado_cotizacion,
            color_edoCot: dato.color_edoCot,
            fondo_edoCot: dato.fondo_edoCot,
            id_cotizacion: dato.id_cotizacion
          });
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
        console.log('ID Solicitud:', idSolicitud);
      },
    }); */
    this.companias.set([
      {
            id_solicitud : parseInt(this.idSolicitud.toString()),
            id_compania: 1,
            nombre_compania: "CHUBB",
            correo_destino: "correo@chubb.cl",
            fecha_envio: "00-00/0000",
            tiempo_transc: "2 día(s)",
            id_estado_cot: 3,
            estado_cotizacion: "Respuesta registrada",
            color_edoCot: "#149DC9",
            fondo_edoCot: "#DCF0F7",
            id_cotizacion: 1
      },
      {
            id_solicitud : 1,
            id_compania: 2,
            nombre_compania: "MAPFRE",
            correo_destino: "correo@mapfre.cl",
            fecha_envio: "00-00-0000",
            tiempo_transc: "0 día(s)",
            id_estado_cot: 1,
            estado_cotizacion: "Envío pendiente",
            color_edoCot: "#FFC725",
            fondo_edoCot: "#FFF7DF",
            id_cotizacion: 2
      },
      {
            id_solicitud : 1,
            id_compania: 3,
            nombre_compania: "SOUTHBRIDGE",
            correo_destino: "correo@mapfre.cl",
            fecha_envio: "00-00-0000",
            tiempo_transc: " día(s)",
            id_estado_cot: 1,
            estado_cotizacion: "Esperando respuesta",
            color_edoCot: "#F45516",
            fondo_edoCot: "#FDF6DC",
            id_cotizacion: 2
      }
    ]);
  }
  getCellStyle(color: string, fondo: string) {
    return {
      'color': color,
      'background-color': fondo,
      'border': '1px solid' + color,
      'width': 'fit-content',
      'padding-left': '5%',
      'padding-right': '5%'
    };
  }
}
