import { DevolverConObservacionesData } from './../devolver-con-observaciones.component';
import { Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatLabel } from "@angular/material/form-field";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef } from '@angular/material/dialog';
  import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";

export interface SolicitudDevueltaData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;

}


@Component({
  selector: 'app-solicitud-devuelta',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatInputModule, FormsModule],
  templateUrl: './solicitud-devuelta.component.html',
  styleUrl: './solicitud-devuelta.component.css'
})

export class SolicitudDevueltaComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: SolicitudDevueltaData,
   public dialogRef: MatDialogRef<SolicitudDevueltaComponent>) {}

 cerrar(): void {
    this.dialogRef.close();
  }

   confirmar(): void {
    this.dialogRef.close();
  }

}
