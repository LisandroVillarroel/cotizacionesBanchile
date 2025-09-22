import { Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { SolicitudCorregidaComponent } from '../corregir-solicitud/solicitud-corregida/solicitud-corregida.component';
import { SolicitudDevueltaComponent } from './solicitud-devuelta/solicitud-devuelta.component';

export interface DevolverConObservacionesData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;

}
@Component({
  selector: 'app-devolver-con-observaciones',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatFormField, MatInputModule, FormsModule, MatDivider],
  templateUrl: './devolver-con-observaciones.component.html',
  styleUrl: './devolver-con-observaciones.component.css'
})



  export class DevolverConObservacionesComponent {
    constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DevolverConObservacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) {}



  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }

  devolverConObs(): void {
      const dato = {
        solicitudId: this.data.solicitudId,
        rutContratante: '00.000.000-0',
        nomContratante: 'Devolver con Observaciones',
        rubro: 'VIDA',
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
        .open(SolicitudDevueltaComponent, dialogConfig)
        .afterClosed();
    }

  observaciones: string = '';
}
