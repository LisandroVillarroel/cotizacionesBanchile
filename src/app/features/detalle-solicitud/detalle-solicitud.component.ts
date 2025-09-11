import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { InformacionGeneralComponent } from "./informacion-general/informacion-general.component";
import { DocumentosAsociadosComponent } from "./documentosasociados/documentosasociados.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DevolverConObservacionesComponent } from './devolver-con-observaciones/devolver-con-observaciones.component';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [MatFormField, InformacionGeneralComponent, DocumentosAsociadosComponent, MatButtonModule, DevolverConObservacionesComponent],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css',
  encapsulation:ViewEncapsulation.None
})
export default class DetalleSolicitudComponent {
  private readonly dialog = inject(MatDialog);
  abrirDialogoYAvanzar(): void {
    const dato = {
      solicitudId: 'ID123456789',
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
}

