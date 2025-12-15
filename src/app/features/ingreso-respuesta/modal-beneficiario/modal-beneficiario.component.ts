import { Component, Inject, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { BeneficiarioComponent } from "@features/ingreso-solicitud/beneficiario/beneficiario.component";
import { DetalleSolicitudData } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';

@Component({
  selector: 'app-modal-beneficiario',
  standalone: true,
  imports: [MatIcon, BeneficiarioComponent, MatDialogClose, MatIconButton, MatDialogContent],
  templateUrl: './modal-beneficiario.component.html',
  styleUrl: './modal-beneficiario.component.css'
})
export class ModalBeneficiarioComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public dialogRef: MatDialogRef<ModalBeneficiarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudData
   ) {}

  idSolicitud = this.data.idSolicitud;

}
