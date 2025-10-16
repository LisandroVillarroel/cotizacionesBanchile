import { CompaniasContactadasService } from '../service/companias-contactadas.service';
import { Component, input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompania } from '../modelo/detalle-interface';
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
export class CompaniasContactadasComponent {
  panelOpenState = false;
  companias = input.required<ICompania[] | undefined>();

  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);

  constructor() { }

/*   async ngOnInit(){
    this.cargarCompanias(this.idSolicitud);
  }
 */
/*   cargarCompanias(idSolicitud: any){
      this.companiasService.postCompanias(idSolicitud).subscribe({
      next: (dato: ICompaniaResponse) => {
        if (dato.codigo === 200) {
          this.companias.set(dato.p_cursor);
        }
      }
    });
  } */
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

  getCellStyle(estado: number) {
    var color: string;
    var fondo: string;
    if(estado === 1){
      color = '#FFC725'; fondo = '#FFF7DF';
    }else if(estado === 2){
      color = '#149DC9'; fondo = '#DCF0F7';
    }else if(estado === 3){
      color = '#285B9B'; fondo = '#DCF0F7';
    }else if(estado === 4){
      color = '#6baa1f'; fondo = '#E9F2ED';
    }else{
      color = '#F45516'; fondo = '#FDF6DC';
    }

    return {
      'color': color,
      'background-color': fondo,
      'border': '1px solid' + color,
      'width': '170px',
      'text-align': 'center',
      'padding-left': '1%',
      'padding-right': '1%'
    };
  }
}
