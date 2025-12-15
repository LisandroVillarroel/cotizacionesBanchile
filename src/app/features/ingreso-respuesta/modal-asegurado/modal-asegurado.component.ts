import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { AseguradoComponent } from "@features/ingreso-solicitud/asegurado/asegurado.component";
import { DetalleSolicitudData } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';

@Component({
  selector: 'app-modal-asegurado',
  standalone: true,
  imports: [MatIcon, AseguradoComponent, MatIconButton, MatDialogClose, MatDialogContent],
  templateUrl: './modal-asegurado.component.html',
  styleUrl: './modal-asegurado.component.css'
})
export default class ModalAseguradoComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public dialogRef: MatDialogRef<ModalAseguradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudData
   ) {}

  idSolicitud = this.data.idSolicitud;

}
