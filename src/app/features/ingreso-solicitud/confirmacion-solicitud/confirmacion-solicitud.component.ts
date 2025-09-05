import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmacionSolicitudData {
  solicitudId: string;
  fecha: string;
  rut: string;
  nombre: string;
  ramo: string;
  cuestionario: string;
  documentos: string;
}

@Component({
  selector: 'app-confirmacion-solicitud-dialog',
  standalone: true,
  templateUrl: './confirmacion-solicitud.component.html',
  styleUrls: ['./confirmacion-solicitud.component.scss'],
  imports: [MatIconModule, MatDialogModule],
})
export class ConfirmacionSolicitudDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionSolicitudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionSolicitudData
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }
}
