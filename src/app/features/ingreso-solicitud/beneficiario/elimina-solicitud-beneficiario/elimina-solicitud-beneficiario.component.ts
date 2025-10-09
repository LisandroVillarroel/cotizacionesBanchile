import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  IBeneficiario,
  IBeneficiarioListaParametro,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '@features/ingreso-solicitud/service/beneficiario.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';

@Component({
  selector: 'app-elimina-solicitud-beneficiario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './elimina-solicitud-beneficiario.component.html',
  styleUrl: './elimina-solicitud-beneficiario.component.css',
})
export class EliminaSolicitudBeneficiarioComponent {
  beneficiario!: IBeneficiario;

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<EliminaSolicitudBeneficiarioComponent>
  );
  public readonly data = inject<IBeneficiarioListaParametro>(MAT_DIALOG_DATA);




  eliminar() {

    this.beneficiarioService
      .postEliminaBeneficiario(Number(this.data.idSolicitud),this.data.datoBeneficiarioPar.rut_beneficiario)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            //alert('Eliminó Beneficiario Bien');
            this.dialogRef.close('eliminado');
          } else {
            if (dato.codigo != 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
              alert('Error:' + dato.mensaje);
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }
}
