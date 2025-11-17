import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IBeneficiarioLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';


@Component({
  selector: 'app-consulta-beneficiario',
  templateUrl: './consulta-beneficiario.component.html',
  styleUrls: ['./consulta-beneficiario.component.css'],
  standalone: true,
  imports: [MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  CabeceraPopupComponente],
})
export class ConsultaBeneficiarioComponent {
private readonly dialogRef = inject(MatDialogRef<ConsultaBeneficiarioComponent>);
  public readonly data = inject<IBeneficiarioLista>(MAT_DIALOG_DATA);
}
