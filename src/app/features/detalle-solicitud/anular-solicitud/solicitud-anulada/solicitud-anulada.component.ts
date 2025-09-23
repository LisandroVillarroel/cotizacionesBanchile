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
import { AnularSolicitudComponent } from '../anular-solicitud.component';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-solicitud-anulada',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatInputModule, FormsModule],
  templateUrl: './solicitud-anulada.component.html',
  styleUrl: './solicitud-anulada.component.css'
})
export class SolicitudAnuladaComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudComponent,
  public dialogRef: MatDialogRef<SolicitudAnuladaComponent>) {}


 cerrar(): void {
    this.dialogRef.close();
  }

   confirmar(): void {
    this.dialogRef.close();
  }

}
