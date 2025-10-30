import { Component, computed, input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from "@angular/material/card";
import { ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    CommonModule
],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent {
  infoGral = input.required<ISolicitud | undefined>();
  infoSolicitud = computed(()=> this.infoGral());


  //getCellStyleSla(value: string) {
  getCellClass(value: string): string {
    var salida = 'gris';
    if(value !== null){
      switch(value.toLowerCase()){
        case 'v':
          salida = 'verde' ; break;
        case 'a':
          salida = 'amarillo'; break;
        case 'r':
          salida = 'rojo'; break;
        default: salida = 'black'; break;
      }
    }
    return salida;
  }

  getText(value: string): string {
    var salida = 'Desconocido';
    if(value !== null){
      switch(value.toLowerCase()){
        case 'v':
          salida = 'A tiempo' ; break;
        case 'a':
          salida = 'Con demora'; break;
        case 'r':
          salida = 'Demora crítica'; break;
        default: salida = 'Desconocido'; break;
      }
    }
    return salida;
  }
}
