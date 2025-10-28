import {
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
//interfaces
import {
  DetalleSolicitudInterface,
  ICompania,
  ICompaniaResponse,
  IObservacion,
  ISolicitud,
} from './modelo/detalle-interface';
//Servicios
import { DetalleSolicitudService } from './service/detalle-solicitud.service';
//Componentes reutilizados
import { InformacionGeneralComponent } from './informacion-general/informacion-general.component';
import { AseguradoComponent } from '@features/ingreso-solicitud/asegurado/asegurado.component';
import { BeneficiarioComponent } from '@features/ingreso-solicitud/beneficiario/beneficiario.component';
import { CuestionarioComponent } from '@features/ingreso-solicitud/cuestionario/cuestionario.component';
import { MateriaAseguradaComponent } from '@features/ingreso-solicitud/materia-asegurada/materia-asegurada.component';
//Componentes nuevos
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { CompaniasContactadasComponent } from './companias-contactadas/companias-contactadas.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';
import { DevolverSolicitudComponent } from './devolver-solicitud/devolver-solicitud.component';

import { AgregarCompaniaComponent } from './companias-contactadas/agregar-compania/agregar-compania.component';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IngresoRespuestaComponent } from '@features/ingreso-respuesta/ingreso-respuesta.component';
import { CreacionPropuestaComponent } from '@features/creacion-propuesta/creacion-propuesta.component';
import { EnviarCoordinadorComponent } from './enviar-coordinador/enviar-coordinador.component';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompaniasContactadasService } from './service/companias-contactadas.service';
import { AprobarSolicitudComponent } from './aprobar-solicitud/aprobar-solicitud.component';
import { EnviarACompaniaComponent } from './companias-contactadas/enviar-a-compania/enviar-a-compania.component';
import { IMinimoResponse } from './modelo/compania';
import { AprobarCotizacionComponent } from '@features/gestion-cotizaciones/aprobar-cotizacion/aprobar-cotizacion.component';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [
    InformacionGeneralComponent,
    AseguradoComponent,
    BeneficiarioComponent,
    MateriaAseguradaComponent,
    CuestionarioComponent,
    ObservacionesComponent,
    CompaniasContactadasComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    CommonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css',
  encapsulation: ViewEncapsulation.None,
})
export default class DetalleSolicitudComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  panelOpenState = false;
  panelOpenState2 = false;

  idSol = computed(() => this.idSolicitud.toString());
  minimo = 0;
  puedeEnviar = false;

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  id_usuario = this._storage()?.usuarioLogin.usuario!;
  tipoUsuario = this._storage()?.usuarioLogin.tipoUsuario!;
  tipoUsuario = this._storage()?.usuarioLogin.tipoUsuario!;
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiasService = inject(CompaniasContactadasService);

  verEjec = true;
  verCoord = true;

  detalleService = inject(DetalleSolicitudService);
  infoGral = signal<ISolicitud | undefined>(undefined);
  observaciones = signal<IObservacion[] | undefined>(undefined);
  companias = signal<ICompania[] | undefined>(undefined);
  edoSolicitud = signal<string | undefined>(undefined);



  //flags para habilitar/deshabilitar botones
  flagAnular = true;
  flagDevolver = true;
  flagAprobar = true;
  flagCompania = true;
  flagCoordinador = true;
  flagPropuesta = true;
  flagCotizacion = true;
  flagAprobarCot = false;

  async ngOnInit() {
    this.cargarSolicitud(this.idSolicitud);
    this.obtenerMinimo(this.idSolicitud);
    this.cargarCompanias(this.idSolicitud);

    switch (this.tipoUsuario) {
      case 'E':
        this.verCoord = false;
        break;
      case 'C':
        this.verEjec = false;
        break;
      case 'S':
        this.verEjec = false;
        this.verCoord = false;
        break;
      case 'A':
        this.verEjec = false;
        this.verCoord = false;
        break;
    }
  }

  cargarSolicitud(idSolicitud: number) {
    this.flagAnular = true;
    this.flagDevolver = true;
    this.flagAprobar = true;
    this.flagCompania = true;
    this.flagCoordinador = true;
    this.flagPropuesta = true;
    this.flagCotizacion = true;

    this.detalleService.postDetalle(idSolicitud).subscribe({
      next: (dato: DetalleSolicitudInterface) => {
        if (dato.codigo === 200) {
          this.infoGral.set({
            id_solicitud: this.idSolicitud,
            fecha_creacion_solicitud: dato.p_fecha_creacion_solicitud,
            rut_contratante: dato.p_rut_contratante,
            nombre_razon_social_contratante:
              dato.p_nombre_razon_social_contratante,
            id_rubro: dato.p_id_rubro,
            nombre_rubro: dato.p_nombre_rubro,
            id_tipo_seguro: dato.p_id_tipo_seguro,
            nombre_tipo_seguro: dato.p_nombre_tipo_seguro,
            sla: dato.p_sla,
            id_estado_solicitud: dato.p_id_estado_solicitud,
            nombre_estado: dato.p_nombre_estado,
            nombre_ejecutivo_banco: dato.p_nombre_ejecutivo_banco,
            id_ejecutivo_banco: dato.p_id_ejecutivo_banco,
          });
          this.observaciones.set(dato.c_observaciones);
          this.edoSolicitud.set(dato.p_nombre_estado);

          /* Inicio BackEnd */
          if (
            this.edoSolicitud()! !== 'Anulada' &&
            this.edoSolicitud()! !== 'Terminada' &&
            this.edoSolicitud()! !== 'Propuesta Pendiente' &&
            this.edoSolicitud()! !== 'Propuesta Emitida'
          ) {
            this.flagAnular = false;
            //this.flagPropuesta = false;
            if (
              this.edoSolicitud()! === 'Aprobada' ||
              this.edoSolicitud()! === 'Cotizacion'
            ) {
              this.flagCompania = false;
            }
            if (
              this.edoSolicitud()! === 'Edicion' ||
              this.edoSolicitud()! === 'Devuelta'
            ) {
              this.flagCoordinador = false;
            }
            if (this.edoSolicitud()!.toUpperCase() === 'REVISION') {
              this.flagDevolver = false;
              this.flagAprobar = false;
            }
            if (this.edoSolicitud()! === 'Cotizacion') {
              this.flagCotizacion = false;
            }
          }
          if (this.edoSolicitud()! === 'Propuesta Pendiente') {
            this.flagPropuesta = false;
          }
          /* Fin BackEnd */
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  cargarCompanias(idSolicitud: any) {
    this.companiasService.postCompanias(idSolicitud).subscribe({
      next: (dato: ICompaniaResponse) => {
        if (dato.codigo === 200) {
          this.companias.set(dato.p_cursor);
          if(this.companias()?.length! < this.minimo){
            this.puedeEnviar = true;
          }else{
            this.puedeEnviar = false;
          }
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  obtenerMinimo(idSolicitud: number) {
    this.companiasService.postMinimo(idSolicitud).subscribe({
      next: (dato: IMinimoResponse) => {
        if (dato.codigo === 200) {
          this.minimo = dato.p_minimo_cotizaciones;
          if (this.companias()?.length! < this.minimo) {
            this.puedeEnviar = true;
          } else {
            this.puedeEnviar = false;
          }
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  solicitudId: any;
  DetalleSolicitudComponent: any;

  devolverSolicitud(): void {
    const dato = {
      solicitudId: this.idSolicitud, //'ID123456789',
      fecha: this.infoGral()?.fecha_creacion_solicitud,
      ejecutivo: this.infoGral()?.nombre_ejecutivo_banco,
      id_usuario: this.id_usuario,
      id_tipo_usuario: this.tipoUsuario
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;
    this.dialog
      .open(DevolverSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
      });
  }

  aprobarSolicitud(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(AprobarSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
      });
  }

  anularSolicitud(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(AnularSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
      });
  }

  enviarCoordinador(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //Ajustes clave para evitar espacio en blanco
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(EnviarCoordinadorComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
      });
  }

  agregarCompania(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud, //'ID123456789',
      fecha: this.infoGral()?.fecha_creacion_solicitud, //'00-00-0000',
      ejecutivo: this.infoGral()?.nombre_ejecutivo_banco, //'Enviar a Compañia',
      id_rubro: this.infoGral()?.id_rubro,
      id_tipo_seguro: this.infoGral()?.id_tipo_seguro,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //Ajustes clave para evitar espacio en blanco
    dialogConfig.width = '60%'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90%'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(AgregarCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
      });
  }

  enviarCia(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this.id_usuario,
      p_tipo_usuario: this.tipoUsuario
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //Ajustes clave para evitar espacio en blanco
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(EnviarACompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
      });
  }

  ingresarRespuesta(): void {
    const dato = {
      solicitudId: this.idSolicitud,
      rutContratante: this.infoGral()?.rut_contratante, //'00-00-0000',//'00.000.000-0',
      nomContratante: this.infoGral()?.nombre_razon_social_contratante,
      rubro: this.infoGral()?.nombre_rubro,
      tipoSeguro: this.infoGral()?.nombre_tipo_seguro,
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.idSolicitud;
    this.dialog
      .open(IngresoRespuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
      });
  }

  crearPropuesta(): void {
    const dato = {
      solicitudId: this.idSolicitud,
      rutContratante: this.infoGral()?.rut_contratante,
      nomContratante: this.infoGral()?.nombre_razon_social_contratante,
      rubro: this.infoGral()?.nombre_rubro,
      tipoSeguro: this.infoGral()?.nombre_tipo_seguro,
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.idSolicitud;
    this.dialog
      .open(CreacionPropuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.cargarSolicitud(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
      });
  }


   aprobarCotizacion(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this.id_ejecutivo,
    };
    console.log('p_id_solicitud,p_id_usuario', dato.p_id_solicitud, dato.p_id_usuario);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(AprobarCotizacionComponent, dialogConfig)
      .afterClosed()
      .subscribe((dato) => {
        this.cargarSolicitud(this.idSolicitud);
        this.cargarCompanias(this.idSolicitud);
        this.obtenerMinimo(this.idSolicitud);
      });
  }
}
