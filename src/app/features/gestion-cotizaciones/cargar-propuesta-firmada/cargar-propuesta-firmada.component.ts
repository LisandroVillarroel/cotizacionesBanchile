import { Component, ElementRef, Inject, signal, ViewChild } from '@angular/core';
import CabeceraPopupComponente from "../../../shared/ui/cabeceraPopup.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


export interface CargarPptaData {
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
  selector: 'app-cargar-propuesta-firmada',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatCard,
    MatCardHeader,
    MatDivider,
    MatCardContent,
    MatCardActions,
    ReactiveFormsModule,
    MatIcon,
    MatFormField,
    MatLabel,
  MatInput,
MatInputModule,MatButton],
  templateUrl: './cargar-propuesta-firmada.component.html',
  styleUrl: './cargar-propuesta-firmada.component.css'
})
export class CargarPropuestaFirmadaComponent {
    @ViewChild('fileInputPptaFirmada')
    fileInputPptaFirmada!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInputFactura')
    fileInputFactura!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInputDocuAdicional')
    fileInputDocuAdicional!: ElementRef<HTMLInputElement>;

    selectedPptaFirmadaFile: File | null = null;
    selectedFacturaFile: File | null = null;
    selectedDocuAdicionalFile: File | null = null;
    archivoPptaFirmada: File | null = null;
    archivoFactura: File | null = null;
    archivoDocuAdicional: File | null = null;

    nombrePptaFirmada: string = '';
    nombreFactura: string = '';
    nombreDocuAdicional: string = '';
    habilitarModificar = false;
    //tipoUsuario: string;

    habilitarCards: boolean = false; // bandera para habilitar/deshabilitar los otros mat-cards

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CargarPropuestaFirmadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CargarPptaData
  ) { }



  compania = new FormControl<number | null>(null, Validators.required);
  // cargaPptaFirmada = signal<FormGroup>(
  //   new FormGroup({
  //     compania: this.compania,
  //   })
  // );

  abrirPptaFirmada(): void {
    this.fileInputPptaFirmada.nativeElement.click();
  }

  abrirSelectorFactura(): void {
    this.fileInputFactura.nativeElement.click();
  }

  abrirSelectorDocuAdicional(): void {
    this.fileInputDocuAdicional.nativeElement.click();
  }

  onFileSelectedPptaFirmada(event: any) {
    const filePptaFirmada: File = event.target.files[0];
    if (filePptaFirmada) {
      this.selectedPptaFirmadaFile = filePptaFirmada;
      this.nombrePptaFirmada = filePptaFirmada.name;
      this.habilitarCards = true; // habilita los otros mat-card
    }
  }

  onFileSelectedFactura(event: any) {
    const fileFactura: File = event.target.files[0];
    if (fileFactura) {
      this.selectedFacturaFile = fileFactura;
      this.nombreFactura = fileFactura.name;
    }
  }

  onFileSelectedDocuAdicinal(event: any) {
    const fileDocuAdicional: File = event.target.files[0];
    if (fileDocuAdicional) {
      this.selectedDocuAdicionalFile = fileDocuAdicional;
      this.nombreDocuAdicional = fileDocuAdicional.name;
    }
  }

  eliminarPptaFirmada(): void {
    this.archivoPptaFirmada = null;
    this.nombrePptaFirmada = '';
    this.fileInputPptaFirmada.nativeElement.value = '';
    this.habilitarCards = false; // deshabilita los otros mat-card
    this.eliminarArchivoFactura();
    this.eliminarArchivoDocuAdicional();
  }

  eliminarArchivoFactura(): void {
    this.archivoFactura = null;
    this.nombreFactura = '';
    this.fileInputFactura.nativeElement.value = '';
  }

  eliminarArchivoDocuAdicional(): void {
    this.archivoDocuAdicional = null;
    this.nombreDocuAdicional = '';
    this.fileInputDocuAdicional.nativeElement.value = '';
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }


}
