import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import DetalleSolicitudComponent from '../detalle-solicitud.component';
import { MatLabel } from "@angular/material/form-field";

@Component({
  selector: 'app-aprobar-solicitud',
   standalone: true,
    imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    CommonModule,
    MatLabel
],
  templateUrl: './aprobar-solicitud.component.html',
  styleUrls: ['./aprobar-solicitud.component.css']
})
export class AprobarSolicitudComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<AprobarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudComponent
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }

  observaciones: string = '';
}
