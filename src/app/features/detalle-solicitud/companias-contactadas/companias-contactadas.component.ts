import {
  Component,
  input,
  inject,
  signal,
  Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';
import { StorageService } from '@shared/service/storage.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { CompaniasContactadasService } from '../service/companias-contactadas.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { ICompania, ISolicitud } from '../modelo/detalle-interface';
import { VerCompaniaComponent } from './ver-compania/ver-compania.component';
import { IngresoRespuestaComponent } from '@features/ingreso-respuesta/ingreso-respuesta.component';
import { IEliminaCompania } from '../modelo/compania';

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
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    MatIconButton,
    MatDivider,
  ],
})
export class CompaniasContactadasComponent {
  @Input() verEjec: boolean = true;
  @Input() minimo: number = 0;
  @Input() idSolicitud!: number;
  @Input() cotizacionSeleccionada: number | null = null;
  @Input() flagSoloCerrar: boolean = false;

  @Output() cotizacionSeleccionadaEvent = new EventEmitter<number>();
  @Output() actualizarDatos = new EventEmitter<void>();

  panelOpenState = false;
  infoGral = input.required<ISolicitud | undefined>();
  companias = input.required<ICompania[] | undefined>();
  idCompania = 0;
  compania = signal<ICompania | undefined>(undefined);

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin?.usuario;
  tipoUsuario = this._storage()?.usuarioLogin?.tipoUsuario;
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);
  dialog = inject(MatDialog);

  constructor() {
   }

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

  verCotiPropuesta(idCompania: number): void {
    this.compania.set(this.companias()?.find(
      (c) => c.p_id_compania_seguro === idCompania));

    const dato = {
      infoGral: this.infoGral()!,
      compania: this.compania()!,
      flagAccion: false, // false indica modo edición
      modo: 'modificar', // opcional para diferenciar
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = dato;

    this.dialog
      .open(IngresoRespuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.actualizarDatos.emit();
      });
  }

  verCotizacion(id: number) {
    const companiaSeleccionada = this.companias()?.find(
      (c) => c.p_id_compania_seguro === id
    );

    if (companiaSeleccionada) {
      this.verCompania(companiaSeleccionada);
    } else {
      this.notificacioAlertnService.error('error','No se encontró la compañía con el ID: '+ id);
    }
  }

  async borrarCompania(idCompania: number) {
    const request:IEliminaCompania = {
      p_id_solicitud: this.infoGral()!.id_solicitud,
      p_id_compania_seguro: idCompania,
      p_id_usuario: this.id_usuario!,
      p_tipo_usuario: this.tipoUsuario!,
    };



    const eliminada = await this.notificacioAlertnService.confirmacionSelectiva(
      'Eliminar Compañía',
      'Esta compañía será desvinculada de la solicitud nro. '+ request.p_id_solicitud +'.'+
      '\n\n ¿Deseas continuar?',
      'Eliminar compañía', 'Cancelar'
    );

    if(eliminada)
    {
      this.companiasService.postEliminaCompania(request).subscribe({
        next: async (dato) => {
          if (dato.codigo === 200) {
            await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
              "La compañía ha sido eliminada exitosamente.");
            this.actualizarDatos.emit();
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','No fue posible eliminar la compañía.');
        },
      });
    }
  }

  seleccionarCotizacion(id: number) {
    this.cotizacionSeleccionada = id;
    //console.log('Cotización seleccionada:', id);
    this.cotizacionSeleccionadaEvent.emit(id);
  }

  verCompania(companiaSeleccionada: ICompania): void {
    const dato = {
      p_id_solicitud: this.infoGral()?.id_solicitud,
      fecha: this.infoGral()?.fecha_creacion_solicitud,
      ejecutivo: this.infoGral()?.nombre_ejecutivo_banco,
      id_rubro: this.infoGral()?.id_rubro,
      id_tipo_seguro: this.infoGral()?.id_tipo_seguro,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario,

      p_id_compania_seguro: companiaSeleccionada?.p_id_compania_seguro,
      nombre_compania_seguro: companiaSeleccionada?.p_nombre_compania_seguro,
      //correo: companiaSeleccionada?.correo_compania_seguro,
      /* p_detalle_solicitud_cotizacion:
        companiaSeleccionada?.p_detalle_solicitud_cotizacion || '', */
      p_id_detalle_solicitud_cotizacion:
        companiaSeleccionada?.p_id_detalle_solicitud_cotizacion || '',
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '90%';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;

    this.dialog
      .open(VerCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result) { this.actualizarDatos.emit(); }
      });
  }

  recibida(estado: string){
    if(estado.toLowerCase() === "recibida"){
      return false;
    }
    return true;
  }

  pendiente(estado: string){
    if(estado.toLowerCase()==='pendiente' && !this.verEjec){
      return false;
    }
    return true;
  }

  enviada(estado: string){
    if(estado.toLowerCase()==='enviada' && !this.verEjec){
      return false;
    }
    return true;
  }

  cotizar(idCompania: number, accion: boolean): void {
    this.compania.set(this.companias()?.find(
      (c) => c.p_id_compania_seguro === idCompania));

    const dato = {
      infoGral: this.infoGral()!,
      compania: this.compania()!,
      flagAccion: accion
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;

    this.dialog
      .open(IngresoRespuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.actualizarDatos.emit();
        }
      });
  }

  habilitaRadioButton(estado: string): boolean {
    return estado?.toLowerCase() === 'recibida';
  }

}
