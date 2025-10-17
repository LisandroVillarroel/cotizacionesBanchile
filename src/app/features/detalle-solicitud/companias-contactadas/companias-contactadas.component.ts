import { CompaniasContactadasService } from '../service/companias-contactadas.service';
import { Component, input, inject, computed, signal } from '@angular/core';
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
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

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

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
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
}
