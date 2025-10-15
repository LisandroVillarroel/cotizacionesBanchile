import { Component, computed, input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from "@angular/material/card";
import { ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
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
        default: salida = 'gris'; break;
      }
    }
    return salida;
  }
/*     if(value === null) return { 'color': '#666668 !important;' };

    if(value?.toLowerCase() === "v"){
      return { 'color': '#008000 !important;' };
    }else if (value?.toLowerCase() === "a"){
      return { 'color': '#ffff00 !important;' };
    }else if(value?.toLowerCase() === "r"){
      return { 'color': '#ff0000 !important;' };
    }else{
      return { 'color': '#666668 !important;' };
    }
  }*/

}
