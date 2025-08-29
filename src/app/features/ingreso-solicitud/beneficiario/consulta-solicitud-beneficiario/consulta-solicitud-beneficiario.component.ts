import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ISolicitudBeneficiario } from '@features/ingreso-solicitud/modelo/ingreso-solicitud';


@Component({
  selector: 'app-consulta-solicitud-beneficiario',
  standalone: true,
  imports: [MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,],
  templateUrl: './consulta-solicitud-beneficiario.component.html',
  styleUrl: './consulta-solicitud-beneficiario.component.css'
})
export class ConsultaSolicitudBeneficiarioComponent {
private readonly dialogRef = inject(MatDialogRef<ConsultaSolicitudBeneficiarioComponent>);
  public readonly data = inject<ISolicitudBeneficiario>(MAT_DIALOG_DATA);
}
