import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import CabeceraPopupComponente from "../../../shared/ui/cabeceraPopup.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatLabel, MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export interface CargarPptaIsolData {
  p_id_solicitud: number;
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_rut_contratante: string;
  P_nombre_razon_social_contratante: string;
  p_id_rubro: string;
  p_nombre_rubro: string;
  p_tipo_seguro: string;
  p_nombre_seguro: string;
}

@Component({
  selector: 'app-cargar-propuesta-isol',
  standalone: true,
  imports: [CabeceraPopupComponente, MatDialogContent, MatCard, MatCardHeader,
    MatDivider, MatCardContent, MatLabel, MatFormField, MatIcon, MatCardActions, MatInput, MatInputModule, MatButton],
  templateUrl: './cargar-propuesta-isol.component.html',
  styleUrl: './cargar-propuesta-isol.component.css'
})
export class CargarPropuestaIsolComponent {
  @ViewChild('fileInputPptaIsol')
  fileInputPptaIsol!: ElementRef<HTMLInputElement>;

  selectedPptaIsolFile: File | null = null;
  archivoPptaIsol: File | null = null;

  nombrePptaIsol: string = '';

  habilitarModificar = false;


  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CargarPropuestaIsolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CargarPptaIsolData
  ) { }




  abrirPptaIsol(): void {
    this.fileInputPptaIsol.nativeElement.click();
  }

  onFileSelectedPptaIsol(event: any) {
    const filePptaIsol: File = event.target.files[0];
    if (filePptaIsol) {
      this.selectedPptaIsolFile = filePptaIsol;
      this.nombrePptaIsol = filePptaIsol.name;
    }
  }


  eliminarPptaIsol(): void {
    this.archivoPptaIsol = null;
    this.nombrePptaIsol = '';
    this.fileInputPptaIsol.nativeElement.value = '';
  }


  cancelar(): void {
    this.dialogRef.close('cancelado');
  }



}
