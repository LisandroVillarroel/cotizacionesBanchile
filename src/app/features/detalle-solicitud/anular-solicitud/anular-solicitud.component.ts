import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
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
import { SolicitudAnuladaComponent } from './solicitud-anulada/solicitud-anulada.component';

@Component({
  selector: 'app-anular-solicitud',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatFormField, MatInputModule, FormsModule, MatDivider],
  templateUrl: './anular-solicitud.component.html',
  styleUrl: './anular-solicitud.component.css'
})
export class AnularSolicitudComponent {
  constructor(
    public dialogRef: MatDialogRef<AnularSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudComponent,
    private dialog: MatDialog
  ) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }

  anularYConfirmar(): void {
    const dato = {
      solicitudId: this.data.solicitudId
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
      .open(SolicitudAnuladaComponent, dialogConfig)
      .afterClosed();
  }


  observaciones: string = '';
}
