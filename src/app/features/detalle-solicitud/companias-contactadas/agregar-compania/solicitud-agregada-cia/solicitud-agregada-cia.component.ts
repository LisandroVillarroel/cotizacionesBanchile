import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';

export interface SolicitudAgregadaCia {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;
}

@Component({
  selector: 'app-solicitud-agregada-cia',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './solicitud-agregada-cia.component.html',
  styleUrl: './solicitud-agregada-cia.component.css'
})
export class SolicitudAgregadaCiaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SolicitudAgregadaCia,
    public dialogRef: MatDialogRef<SolicitudAgregadaCiaComponent>
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close();
  }
}
