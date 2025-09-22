import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ISolicitudBeneficiario } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';

@Component({
  selector: 'app-elimina-solicitud-beneficiario',
  standalone: true,
  imports: [ MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,],
  templateUrl: './elimina-solicitud-beneficiario.component.html',
  styleUrl: './elimina-solicitud-beneficiario.component.css'
})
export class EliminaSolicitudBeneficiarioComponent {
  private readonly dialogRef = inject(MatDialogRef<EliminaSolicitudBeneficiarioComponent>);
  public readonly data = inject<ISolicitudBeneficiario>(MAT_DIALOG_DATA);

  eliminar(){
    this.dialogRef.close(1);
  }
}
