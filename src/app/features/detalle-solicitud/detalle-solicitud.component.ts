import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { InformacionGeneralComponent } from "./informacion-general/informacion-general.component";
import { DocumentosAsociadosComponent } from "./documentosasociados/documentosasociados.component";
import { MatButtonModule } from '@angular/material/button';

//Ejemplo
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';

import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DevolverConObservacionesComponent } from './devolver-con-observaciones/devolver-con-observaciones.component';
import { AceptarSolicitudDetalleComponent } from './aceptar-solicitud-detalle/aceptar-solicitud-detalle.component';
import { CorregirSolicitudComponent } from './corregir-solicitud/corregir-solicitud.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';
import { MatIcon } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [
    InformacionGeneralComponent,
    DocumentosAsociadosComponent,
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    MatCard,
    MatToolbarModule,
  ],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css',
  encapsulation:ViewEncapsulation.None
})

export default class DetalleSolicitudComponent {
  idCotizacion =  input.required<string | undefined>();
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<DetalleSolicitudComponent>);

  solicitudId: any;
  DetalleSolicitudComponent: any;
  devolverSolicitud(): void {
    const dato = {
      solicitudId: this.idCotizacion,//'ID123456789',
      fecha: '00 - 00 - 0000',
      ejecutivo: 'Manuel Sepúlveda',
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
      .open(DevolverConObservacionesComponent, dialogConfig)
      .afterClosed();
  }

  aceptarSolDetalle(): void {
    const dato = {
      solicitudId: this.idCotizacion//'ID COT_12040_123412'
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
      .open(AceptarSolicitudDetalleComponent, dialogConfig)
      .afterClosed();
  }

   anularSol(): void {
    const dato = {
      solicitudId: this.idCotizacion//'ID COT_Anular_123412'
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
      .afterClosed();
  }


 corregirSolicitud(): void {
    const dato = {
      solicitudId: this.idCotizacion,
      rutContratante: '00.000.000-0',
      nomContratante: 'Felipe Medina Suárez',
      rubro: 'VIDA',
      tipoSeguro: 'Oncologíco',
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

}
