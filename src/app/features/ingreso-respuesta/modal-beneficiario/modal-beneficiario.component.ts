import { Component, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BeneficiarioComponent } from '@features/ingreso-solicitud/beneficiario/beneficiario.component';

@Component({
  selector: 'app-modal-beneficiario',
  standalone: true,
  imports: [MatIcon, BeneficiarioComponent, MatDialogClose, MatIconButton, MatDialogContent],
  templateUrl: './modal-beneficiario.component.html',
  styleUrl: './modal-beneficiario.component.css',
})
export class ModalBeneficiarioComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  idSol = computed(() => this.idSolicitud);
}
