import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IBeneficiarioLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-consulta-beneficiario',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './consulta-beneficiario.component.html',
  styleUrl: './consulta-beneficiario.component.css',
})
export class ConsultaBeneficiarioComponent {
  private readonly dialogRef = inject(MatDialogRef<ConsultaBeneficiarioComponent>);
  public readonly data = inject<IBeneficiarioLista>(MAT_DIALOG_DATA);
}
