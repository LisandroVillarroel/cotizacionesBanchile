import { Component, computed, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { DetalleSolicitudInterface, ICompania, IObservacion, ISolicitud, IAseguradoDet, IBeneficiarioDet } from './detalle-interface';
import { DetalleSolicitudService } from './detalle-solicitud.service';
import { InformacionGeneralComponent } from "./informacion-general/informacion-general.component";
//import { DevolverConObservacionesComponent } from './devolver-con-observaciones/devolver-con-observaciones.component';
import { CorregirSolicitudComponent } from './corregir-solicitud/corregir-solicitud.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';

import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { AseguradoComponent } from '@features/ingreso-solicitud/asegurado/asegurado.component';
import { BeneficiarioComponent } from '@features/ingreso-solicitud/beneficiario/beneficiario.component';
import { CuestionarioComponent } from '@features/ingreso-solicitud/cuestionario/cuestionario.component';
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { CompaniasContactadasComponent } from './companias-contactadas/companias-contactadas.component';
import { EnviarACompaniaComponent } from './companias/enviar-a-compania/enviar-a-compania.component';
import { AprobarSolicitudComponent } from './aprobar-solicitud/aprobar-solicitud.component';
import { DevolverSolicitudComponent } from './devolver-solicitud/devolver-solicitud.component';
import { MateriaAseguradaComponent } from '@features/ingreso-solicitud/materia-asegurada/materia-asegurada.component';
import { IngresoRespuestaComponent } from '@features/ingreso-respuesta/ingreso-respuesta.component';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [
    InformacionGeneralComponent,
    AseguradoComponent,
    BeneficiarioComponent,
    CuestionarioComponent,
    ObservacionesComponent,
    CompaniasContactadasComponent,
    MateriaAseguradaComponent,
    //AprobarSolicitudComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    CommonModule,
],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css',
  encapsulation:ViewEncapsulation.None
})

export default class DetalleSolicitudComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<DetalleSolicitudComponent>);

  idSol = computed(() => this.idSolicitud.toString() );

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  idSolicitudParametro=signal<string>('')
  detalleService = inject(DetalleSolicitudService);
  infoGral = signal<ISolicitud | undefined>(undefined);
  //documentos = signal<IDocumento[] | undefined>(undefined);
  observaciones = signal<IObservacion[] | undefined>(undefined);
  companias = signal<ICompania[] | undefined>(undefined);
  //asegurados = signal<IAseguradoDet[] | undefined>(undefined);
  //beneficiarios = signal<IBeneficiarioDet[] | undefined>(undefined);

  async ngOnInit(){
    this.cargarSolicitud(this.idSolicitud);
  }

  cargarSolicitud(idSolicitud: number){
     this.detalleService.postDetalle(idSolicitud).subscribe({
      next: (dato: DetalleSolicitudInterface) => {
        if (dato.codigo === 200) {
          //console.log('Detalle solicitud:', dato);
          this.infoGral.set({
            id_solicitud : this.idSolicitud,
            fecha_creacion_solicitud: dato.p_fecha_creacion_solicitud,
            rut_contratante: dato.p_rut_contratante,
            nombre_razon_social_contratante: dato.p_nombre_razon_social_contratante,
            id_rubro: dato.p_id_rubro,
            nombre_rubro: dato.p_nombre_rubro,
            id_tipo_seguro: dato.p_id_tipo_seguro,
            nombre_tipo_seguro: dato.p_nombre_tipo_seguro,
            sla: dato.p_sla,
            id_estado_solicitud: dato.p_id_estado_solicitud,
            nombre_estado: dato.p_nombre_estado,
            nombre_ejecutivo_banco: dato.p_nombre_ejecutivo_banco,
            id_ejecutivo_banco: dato.p_id_ejecutivo_banco
          });
          //this.asegurados.set(dato.c_asegurados);
          //this.beneficiarios.set(dato.c_beneficiarios);
          this.observaciones.set(dato.c_observaciones);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
        console.log('ID Solicitud:', idSolicitud);
      },
    });
  }

  solicitudId: any;
  DetalleSolicitudComponent: any;

  devolverSolicitud(): void {
    const dato = {
      solicitudId: this.idSolicitud,//'ID123456789',
      fecha: this.infoGral()?.fecha_creacion_solicitud,
      ejecutivo: this.infoGral()?.nombre_ejecutivo_banco,
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
      .subscribe((dato)=>{
        this.cargarSolicitud(this.idSolicitud)
      });
  }










//  devolverSolicitud(idSolicitud: number){
//   console.log('devolverSolicitud idSolicitud',idSolicitud);
//      this.detalleService.postDetalle(idSolicitud).subscribe({
//       next: (dato: DetalleSolicitudInterface) => {
//         if (dato.codigo === 200) {
//           console.log('Detalle solicitud:', dato);
//           this.infoGral.set({
//             id_solicitud : this.idSolicitud,
//             fecha_creacion_solicitud: dato.p_fecha_creacion_solicitud,
//             rut_contratante: dato.p_rut_contratante,
//             nombre_razon_social_contratante: dato.p_nombre_razon_social_contratante,
//             id_rubro: dato.p_id_rubro,
//             nombre_rubro: dato.p_nombre_rubro,
//             id_tipo_seguro: dato.p_id_tipo_seguro,
//             nombre_tipo_seguro: dato.p_nombre_tipo_seguro,
//             sla: dato.p_sla,
//             id_estado_solicitud: dato.p_id_estado_solicitud,
//             nombre_estado: dato.p_nombre_estado
//           });
//           this.observaciones.set(dato.c_observaciones);
//         } else {
//           if (dato.codigo != 500) {
//             console.log('Error:', dato.mensaje);
//           } else {
//             console.log('ERROR DE SISTEMA:');
//           }
//         }
//       },
//       error: (error) => {
//         console.log('ERROR INESPERADO', error);
//         console.log('ID Solicitud:', idSolicitud);

//       },
//     });
//   }

























  aprobarSolicitud(): void {
    const dato = {
      solicitudId: this.idSolicitud//'ID COT_12040_123412'
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
      .open(AprobarSolicitudComponent, dialogConfig)
      .afterClosed();
  }

  anularSolicitud(): void {
    const dato = {
      solicitudId: this.idSolicitud//'ID COT_Anular_123412'
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
      .open(AnularSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe((dato)=>{
        this.cargarSolicitud(this.idSolicitud);
      });
  }


 corregirSolicitud(): void {
    const dato = {
      solicitudId: this.idSolicitud,
      rutContratante: this.infoGral()?.rut_contratante,//'00-00-0000',//'00.000.000-0',
      nomContratante: this.infoGral()?.nombre_razon_social_contratante,
      rubro: this.infoGral()?.nombre_rubro,
      tipoSeguro: this.infoGral()?.nombre_tipo_seguro,
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
      .open(CorregirSolicitudComponent, dialogConfig)
      .afterClosed();
  }

  enviarCia(): void {
    const dato = {
      solicitudId: this.idSolicitud,//'ID123456789',
      fecha: this.infoGral()?.fecha_creacion_solicitud,//'00-00-0000',
      ejecutivo: this.infoGral()?.nombre_ejecutivo_banco,//'Enviar a Compañia',
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
      .afterClosed();
  }









  ingresarRespuesta(idSolicitud: number): void {
    const dato = {
      solicitudId: this.idSolicitud,
      rutContratante: this.infoGral()?.rut_contratante,//'00-00-0000',//'00.000.000-0',
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
    dialogConfig.data = idSolicitud;
    this.dialog
      .open(IngresoRespuestaComponent, dialogConfig)
      .afterClosed()
  }//IngresoRespuestaComponent






}
