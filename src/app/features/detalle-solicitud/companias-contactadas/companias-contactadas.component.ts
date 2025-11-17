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
import { DetalleCotizacionComponent } from '@features/gestion-cotizaciones/detalle-cotizacion/detalle-cotizacion.component';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { ICompania, ISolicitud } from '../modelo/detalle-interface';
import { VerCompaniaComponent } from './ver-compania/ver-compania.component';
import { IngresoRespuestaComponent } from '@features/ingreso-respuesta/ingreso-respuesta.component';

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
  @Input() verCoord: boolean = true;
  @Input() minimo: number = 0;
  @Input() idSolicitud!: number;
  @Input() cotizacionSeleccionada: number | null = null;
  @Input() flagSoloCerrar: boolean = false;

  @Output() cotizacionSeleccionadaEvent = new EventEmitter<number>();
  @Output() cargaRespuesta = new EventEmitter<void>();
  @Output() actualizarDatos = new EventEmitter<void>();


  panelOpenState = false;
  infoGral = input.required<ISolicitud | undefined>();
  companias = input.required<ICompania[] | undefined>();
  //compania: ICompania[];
  idCompania = 0;
  compania = computed(() => this.companias());

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin.usuario!;
  tipoUsuario = this._storage()?.usuarioLogin.tipoUsuario!;
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);
  dialog = inject(MatDialog);
  //detalleGral = signal<InformacionGeneralComponent>

  constructor() {
    //console.log('flagSoloCerrar en Compañias Contactadas:', this.flagSoloCerrar);
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
    this.compania = computed(() =>
      this.companias()!.filter((c) => c.p_id_compania_seguro === idCompania)
    );

    const dato = {
      infoGral: this.infoGral()!,
      compania: this.compania()![0],
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
      .subscribe((confirmado) => {
        if (confirmado) {
          this.actualizarDatos.emit(); // refresca la grilla y estado
        }
      });
  }

  verCotizacion(id: number) {
    console.log('ID recibido en verCotizacion:', id);

    // Aquí puedes buscar la compañía completa en tu lista `companias()`
    const companiaSeleccionada = this.companias()?.find(
      (c) => c.p_id_compania_seguro === id
    );
    console.log('Compañía encontrada:', companiaSeleccionada);

    if (companiaSeleccionada) {
      this.verCompania(companiaSeleccionada);
    } else {
      console.warn('No se encontró la compañía con el ID:', id);
    }
  }


  async borrarCompania(idCompania: number) {
    const request = {
      p_id_solicitud: this.infoGral()?.id_solicitud!,
      p_id_compania_seguro: idCompania,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario,
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
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','No fue posible eliminar la compañia.');
        },
      });
    }
  }

  seleccionarCotizacion(id: number) {
    this.cotizacionSeleccionada = id;
    console.log('Cotización seleccionada:', id);
    this.cotizacionSeleccionadaEvent.emit(id);
  }



  verCompania(companiaSeleccionada: any): void {
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
      correo: companiaSeleccionada?.correo_compania_seguro,
      p_detalle_solicitud_cotizacion:
        companiaSeleccionada?.p_detalle_solicitud_cotizacion || '',
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
        if (result) {
          this.actualizarDatos.emit();
        }
      });
  }
/*
    verDetalleCot(idCompania: number, nombreCia: string) {
    const dato = {
      p_id_solicitud: this.infoGral()?.id_solicitud,
      p_id_compania_seguro: idCompania,
      p_nombre_compania_seguro: nombreCia,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario,
      p_rut_contratante: this.infoGral()?.rut_contratante,
      P_nombre_razon_social_contratante:
        this.infoGral()?.nombre_razon_social_contratante,
      p_id_rubro: this.infoGral()?.id_rubro,
      p_nombre_rubro: this.infoGral()?.nombre_rubro,
      p_tipo_seguro: this.infoGral()?.id_tipo_seguro,
      p_nombre_seguro: this.infoGral()?.nombre_tipo_seguro,
    };

    //  const dato = {
    //  p_id_solicitud: this.infoGral()?.id_solicitud,
    //  p_id_compania_seguro: idCompania,
    //  p_id_usuario: this.id_usuario,
    //  p_tipo_usuario: this.tipoUsuario,
    //  };

    console.log('verDetalleCot:', dato);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;

    this.dialog
      .open(DetalleCotizacionComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.actualizarDatos.emit();
        }
      });
  }
*/
  acciones = computed(() => {
    return (estado: string) => {
      const estadoLower = estado.toLowerCase();

      const acciones: {
        icon: string;
        tooltip: string;
        mostrar: boolean;
        accion: (id: number) => void;
      }[] = [];

      acciones.push({
        icon: 'preview',
        tooltip: 'Ver cotipropuesta',
        mostrar: estadoLower === 'recibida',
        accion: (id: number) => this.verCotiPropuesta(id),
      });


      if (!this.verEjec) {

        acciones.push({
          icon: 'visibility',
          tooltip: 'Ver cotización',
          mostrar: estadoLower === 'pendiente',
          accion: (compania: any) => this.verCotizacion(compania),
        });

        acciones.push({
          icon: 'edit_square',
          tooltip: 'Registrar respuesta',
          mostrar: estadoLower === 'enviada',
          accion: (id: number) => this.registrarRespuesta(id),
        });

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

  verDetalleCot(idCompania: number, nombreCia: string) {
    const dato = {
      p_id_solicitud: this.infoGral()?.id_solicitud,
      p_id_compania_seguro: idCompania,
      p_nombre_compania_seguro: nombreCia,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario,
      p_rut_contratante: this.infoGral()?.rut_contratante,
      P_nombre_razon_social_contratante: this.infoGral()?.nombre_razon_social_contratante,
      p_id_rubro: this.infoGral()?.id_rubro,
      p_nombre_rubro: this.infoGral()?.nombre_rubro,
      p_tipo_seguro: this.infoGral()?.id_tipo_seguro,
      p_nombre_seguro: this.infoGral()?.nombre_tipo_seguro,
    };



    console.log('verDetalleCot:', dato);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;

    this.dialog
      .open(DetalleCotizacionComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.actualizarDatos.emit();
        }
      });
  }


  registrarRespuesta(idCompania: number): void {
    this.compania = computed(() => this.companias()!.filter(c => { return c.p_id_compania_seguro === idCompania }));
    const dato = {
      infoGral: this.infoGral()!,
      compania: this.compania()![0],
      flagAccion: true
    };
    console.log("Info hacia Registro: ", dato);
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
      .subscribe(() => { this.cargaRespuesta.emit(); });
  }


  habilitaRadioButton(estado: string): boolean {
    return estado?.toLowerCase() === 'recibida';
  }

}
