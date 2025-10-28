import { CompaniasContactadasService } from '../service/companias-contactadas.service';
import {
  Component,
  input,
  inject,
  computed,
  signal,
  Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompania } from '../modelo/detalle-interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { MatRadioButton } from "@angular/material/radio";
import { EliminarCompaniaComponent } from './eliminar-compania/eliminar-compania.component';

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
    MatTooltip,
    MatRadioButton
],
})
export class CompaniasContactadasComponent {
  panelOpenState = false;

  companias = input.required<ICompania[] | undefined>();
  companies = computed(() => this.companias());

  @Input() verEjec: boolean = true;
  @Input() verCoord: boolean = true;
  @Input() minimo: number = 0;
  @Input() idSolicitud!: number;

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin.usuario!;
  tipoUsuario = this._storage()?.usuarioLogin.tipoUsuario!;
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);
  dialog = inject(MatDialog);

  constructor() {}

  getCellStyle(estado: number) {
    let color: string;
    let fondo: string;

    switch (estado) {
      case 1:
        color = '#FFC725';
        fondo = '#FFF7DF';
        break;
      case 2:
        color = '#149DC9';
        fondo = '#DCF0F7';
        break;
      case 3:
        color = '#285B9B';
        fondo = '#DCF0F7';
        break;
      case 4:
        color = '#6baa1f';
        fondo = '#E9F2ED';
        break;
      default:
        color = '#F45516';
        fondo = '#FDF6DC';
        break;
    }

    return {
      color: color,
      'background-color': fondo,
      border: '1px solid ' + color,
      width: '130px',
      'text-align': 'center',
      'padding-left': '1%',
      'padding-right': '1%',
    };
  }

  verCotizacion(idCotizacion: number) {
    // lógica para ver cotización
  }

  verCotiPropuesta(idCotizacion: number) {
    // lógica para ver cotipropuesta
  }

  registrarRespuesta(idCotizacion: number) {
    // lógica para registrar respuesta
  }

  cotizacionSeleccionada: string | null = null;

seleccionarCotizacion(id: string) {
  this.cotizacionSeleccionada = id;
  console.log('Cotización seleccionada:', id);
}


  @Output() actualizarDatos = new EventEmitter<void>();

  borrarCompania(idCompania: number) {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_compania_seguro: idCompania,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario,
    };

    console.log('Payload enviado:', dato);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;

    this.dialog
      .open(EliminarCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.actualizarDatos.emit(); // o refrescar la grilla
        }
      });
  }

  acciones = computed(() => {
    return (estado: string) => {
      const estadoLower = estado.toLowerCase();

      const acciones: {
        icon: string;
        tooltip: string;
        mostrar: boolean;
        accion: (id: number) => void;
      }[] = [];

      // Cotipropuesta: todos los usuarios, solo si estado es "recibida"
      acciones.push({
        icon: 'preview',
        tooltip: 'Ver cotipropuesta',
        mostrar: estadoLower === 'recibida',
        accion: (id: number) => this.verCotiPropuesta(id),
      });

      // Solo si NO es ejecutivo
      if (!this.verEjec) {
        // Ver cotización: estado "pendiente"
        acciones.push({
          icon: 'visibility',
          tooltip: 'Ver cotización',
          mostrar: estadoLower === 'pendiente',
          accion: (id: number) => this.verCotizacion(id),
        });

        // Registrar respuesta: estado "enviada"
        acciones.push({
          icon: 'edit_square',
          tooltip: 'Registrar respuesta',
          mostrar: estadoLower === 'enviada',
          accion: (id: number) => this.registrarRespuesta(id),
        });

        // Borrar: estado "pendiente" y usuario coordinador
        acciones.push({
          icon: 'delete',
          tooltip: 'Eliminar cotización',
          mostrar: estadoLower === 'pendiente' && this.verCoord,
          accion: (id: number) => this.borrarCompania(id),
        });
      }

      return acciones.filter((a) => a.mostrar);
    };
  });
}
