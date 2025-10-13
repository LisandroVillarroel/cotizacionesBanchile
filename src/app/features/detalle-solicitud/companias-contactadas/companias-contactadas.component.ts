import { CompaniasContactadasService } from './companias-contactadas.service';
import { Component, computed, input, OnInit, signal, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompaniaResponse, ICompania } from '../modelo/detalle-interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

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
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);
  companias = signal<ICompania[]>([]);
  //contizaciones = signal<ICotizacion[]>([]);
  //compFiltradas = computed(()=> this.companias());


  constructor() { }

  async ngOnInit(){
    this.cargarCompanias(this.idSolicitud);
  }

  cargarCompanias(idSolicitud: any){
      this.companiasService.postCompanias(idSolicitud).subscribe({
      next: (dato: ICompaniaResponse) => {
        if (dato.codigo === 200) {
          this.companias.set(dato.p_cursor);
        } else {
          if (dato.codigo != 500) {
            this.notificacioAlertnService.error("ERROR",dato.mensaje);
          } else {
            this.notificacioAlertnService.error("ERROR","Error de sistema");
          }
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error("ERROR",'Error inesperado. '+ error);
      },
    });
  }
    /*this.companias.set([
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
    ]);*/

  getCellStyle(color: string, fondo: string) {
    return {
      'color': color,
      'background-color': fondo,
      'border': '1px solid' + color,
      'width': '170px',//'fit-content',
      'text-align': 'center',
      'padding-left': '1%',
      'padding-right': '1%'
    };
  }
}
