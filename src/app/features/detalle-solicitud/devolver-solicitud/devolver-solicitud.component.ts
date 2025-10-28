import { Component, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { MatTooltipModule } from '@angular/material/tooltip';
import { DevolverSolicitudService } from './devolver-solicitud.service';
import { IDevuelveRequest } from './devolver-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

export interface DevolverConObservacionesData {
  solicitudId: number;
  fecha: string;
  ejecutivo: string;
  id_usuario: string;
  id_tipo_usuario: string;
}

@Component({
  selector: 'app-devolver-solicitud',
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
  templateUrl: './devolver-solicitud.component.html',
  styleUrl: './devolver-solicitud.component.css'
})

  export class DevolverSolicitudComponent {
    constructor(
    public dialogRef: MatDialogRef<DevolverSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) { }

  notificacioAlertnService = inject(NotificacioAlertnService);

  devolverService = inject(DevolverSolicitudService);
  devolverRequest!: IDevuelveRequest;
  motivo = new FormControl('', [Validators.required, Validators.maxLength(500)]);
  devolverSolicitud= signal<FormGroup>(
    new FormGroup({
        motivo: this.motivo
  }));

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  devolver(motive: string): void {
    if(motive === '' || motive === null){
      return
    }

    this.devolverRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.data.id_usuario,
      p_tipo_usuario: this.data.id_tipo_usuario,
      p_observacion: motive
    };
    this.devolverService
      .postDevuelveSolicitud(this.devolverRequest)
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
              "La solicitud ha sido devuelta exitosamente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

  getErrorMessage() {
    return this.motivo.hasError('required')
    ? 'Debe ingresar el motivo de devolución.' : '';
  }
}
