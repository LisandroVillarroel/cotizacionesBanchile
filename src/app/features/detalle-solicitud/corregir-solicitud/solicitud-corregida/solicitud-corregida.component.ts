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
import { CorregirSolicitudData } from '../corregir-solicitud.component';

@Component({
  selector: 'app-solicitud-corregida',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatInputModule, FormsModule],
  templateUrl: './solicitud-corregida.component.html',
  styleUrl: './solicitud-corregida.component.css'
})
export class SolicitudCorregidaComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: CorregirSolicitudData,
   public dialogRef: MatDialogRef<SolicitudCorregidaComponent>) {}

 cerrar(): void {
    this.dialogRef.close();
  }

   confirmar(): void {
    this.dialogRef.close();
  }

}
