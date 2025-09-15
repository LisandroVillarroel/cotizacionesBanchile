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
import { SolicitudCorregidaComponent } from './solicitud-corregida/solicitud-corregida.component';

export interface CorregirSolicitudData {
rubro: string;
nomContratante: string;
rutContratante: string;
}


@Component({
  selector: 'corregir-solicitud',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatFormField, MatInputModule, FormsModule, MatDivider],
  templateUrl: './corregir-solicitud.component.html',
  styleUrl: './corregir-solicitud.component.css'
})






export class CorregirSolicitudComponent {
  constructor(
  private dialog: MatDialog,
  public dialogRef: MatDialogRef<CorregirSolicitudComponent>,
  @Inject(MAT_DIALOG_DATA) public data: CorregirSolicitudData
) {}


  cerrar(): void {
    this.dialogRef.close();
  }





 corregirYEnviar(): void {
    const dato = {
      rutContratante: '00.000.000-0',
      nomContratante: 'Felipe Medina Suárez',
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
      .open(SolicitudCorregidaComponent, dialogConfig)
      .afterClosed();
  }
observaciones: string = '';

}
