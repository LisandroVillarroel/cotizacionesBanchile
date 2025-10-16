import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule],
})
export class ConfirmacionSolicitudDialogComponent {

  public readonly data = inject<ConfirmacionSolicitudData>(MAT_DIALOG_DATA);
   private readonly dialogRef = inject(
    MatDialogRef<ConfirmacionSolicitudDialogComponent>
  );


  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }
}
