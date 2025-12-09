import { Component, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AseguradoComponent } from '@features/ingreso-solicitud/asegurado/asegurado.component';

@Component({
  selector: 'app-modal-asegurado',
  standalone: true,
  imports: [MatIcon, AseguradoComponent, MatIconButton, MatDialogClose, MatDialogContent],
  templateUrl: './modal-asegurado.component.html',
  styleUrl: './modal-asegurado.component.css',
})
export default class ModalAseguradoComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  idSol = computed(() => this.idSolicitud);
}
