import { Component, Inject, input, QueryList, signal, ViewChildren } from '@angular/core';
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

import { SolicitudEnviadaCiaComponent } from './solicitud-enviada-cia/solicitud-enviada-cia.component';
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatCheckbox } from "@angular/material/checkbox";
import { DocumentosAsociadosComponent } from "@features/detalle-solicitud/documentosasociados/documentosasociados.component";
import { DocumentosAsociadosService } from '@features/detalle-solicitud/documentosasociados/documentosasociados.service';

export interface EnviarACompaniaData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;
}


@Component({
  selector: 'app-enviar-a-compania',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatCardModule,
    MatFormField, MatInputModule, FormsModule, MatDivider, MatRadioGroup, MatRadioButton,
    MatCheckbox, DocumentosAsociadosComponent],
  templateUrl: './enviar-a-compania.component.html',
  styleUrl: './enviar-a-compania.component.css'
})






  export class EnviarACompaniaComponent {
     idSolicitud = input.required<string>();
    idSolicitudParametro=signal<string>('175')
    @ViewChildren('checkboxRef') checkboxes!: QueryList<MatCheckbox>;
  companiaSeleccionada: string | null = null;
    constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EnviarACompaniaComponent>,
    private documentosService: DocumentosAsociadosService,
    @Inject(MAT_DIALOG_DATA) public data: EnviarACompaniaData
  ) {}





    registros: any[] = [];



    ngOnInit(): void {
      this.registros = this.documentosService.obtenerRegistrosConDocumentos();
    }














  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }




enviadoCia(): void {
    const mailMarcado = this.checkboxes.some(cb => cb.checked);
    if (!this.companiaSeleccionada) {
      alert('Debes seleccionar una compañía antes de continuar.');
      return;
    }
    if (!mailMarcado) {
      alert('Debes marcar al menos una casilla de correo electrónico.');
      return;
    }

    const dato = {
      solicitudId: this.data.solicitudId,
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = dato;
    this.dialog.open(SolicitudEnviadaCiaComponent, dialogConfig).afterClosed();
  }
  observaciones: string = '';
}

