import { Component, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule,
  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnularSolicitudService } from './anular-solicitud.service';
import { IAnulaRequest } from './anular-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { IRequest } from '@shared/modelo/servicios-interface';

@Component({
  selector: 'app-anular-solicitud',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatDivider,
    MatTooltipModule,
    ReactiveFormsModule,
    CabeceraPopupComponente
  ],
  templateUrl: './anular-solicitud.component.html',
  styleUrl: './anular-solicitud.component.css'
})
export class AnularSolicitudComponent {
  constructor(
    public dialogRef: MatDialogRef<AnularSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequest,
  ) { }

  notificacioAlertnService = inject(NotificacioAlertnService);

  anularService = inject(AnularSolicitudService);
  anulaRequest!: IAnulaRequest;
  motivo = new FormControl('', [Validators.required]);
  anularSolicitud= signal<FormGroup>(
    new FormGroup({
        motivo: this.motivo
    }));

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  anular(motive: string): void {
    if(motive === '' || motive === null){
      return
    }
    this.anulaRequest = {
      p_id_solicitud: this.data.p_id_solicitud,
      p_id_usuario: this.data.p_id_usuario,
      p_tipo_usuario: this.data.p_tipo_usuario,
      p_observacion: motive
    };
    this.anularService.postAnulaSolicitud(this.anulaRequest)
      .subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.confirmar();
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }

  async confirmar(){
    const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
              "La solicitud ha sido anulada exitosamente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

  getErrorMessage() {
    return this.motivo.hasError('required')
    ? 'Debe ingresar el motivo de la anulación.' : '';
  }
}
