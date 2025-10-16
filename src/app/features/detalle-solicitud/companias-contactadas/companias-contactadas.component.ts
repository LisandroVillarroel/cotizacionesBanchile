import { CompaniasContactadasService } from '../service/companias-contactadas.service';
import { Component, input, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompania } from '../modelo/detalle-interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { MatTooltip } from "@angular/material/tooltip";
import { EnviarACompaniaComponent } from '../companias/enviar-a-compania/enviar-a-compania.component';
import { MatDialogConfig } from '@angular/material/dialog';

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
    CommonModule,
    MatTooltip
  ]
})
export class CompaniasContactadasComponent {
  panelOpenState = false;
  companias = input.required<ICompania[] | undefined>();
  companies = computed(() => {return this.companias()});

  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);

  constructor() { }

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
    enviarCia(): void {
      const dato = {
        solicitudId: this.companies()?.id_solicitud, //'ID123456789',
        fecha: this.infoGral()?.fecha_creacion_solicitud, //'00-00-0000',
        ejecutivo: this.infoGral()?.nombre_ejecutivo_banco, //'Enviar a Compañia',
      };

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      //Ajustes clave para evitar espacio en blanco
      dialogConfig.width = '600px'; // Tamaño fijo y controlado
      dialogConfig.maxHeight = '90vh'; // Altura máxima visible
      dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
      dialogConfig.data = dato;

      this.dialog.open(EnviarACompaniaComponent, dialogConfig).afterClosed();
    }
}
