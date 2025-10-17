import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

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
    CabeceraPopupComponente
  ],
  templateUrl: './elimina-solicitud-beneficiario.component.html',
  styleUrl: './elimina-solicitud-beneficiario.component.css',
})
export class EliminaSolicitudBeneficiarioComponent {
  beneficiario!: IBeneficiario;

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService= inject(NotificacioAlertnService);

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<EliminaSolicitudBeneficiarioComponent>
  );
  public readonly data = inject<IBeneficiarioListaParametro>(MAT_DIALOG_DATA);

  eliminar() {
    this.beneficiarioService
      .postEliminaBeneficiario(
        Number(this.data.idSolicitud),
        this.data.datoBeneficiarioPar.rut_beneficiario
      )
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            this.dialogRef.close('eliminado');
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }
}
