import { Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";

export interface DevolverConObservacionesData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;

}

@Component({
  selector: 'app-aceptar-solicitud-detalle',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatFormField, MatInputModule, FormsModule, MatDivider],
  templateUrl: './aceptar-solicitud-detalle.component.html',
  styleUrl: './aceptar-solicitud-detalle.component.css'
})
export class AceptarSolicitudDetalleComponent {
constructor(
    public dialogRef: MatDialogRef<AceptarSolicitudDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }

  observaciones: string = '';
}
