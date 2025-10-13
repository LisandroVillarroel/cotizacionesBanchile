import { Component, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
  MatDialog,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { MatTooltipModule } from '@angular/material/tooltip';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { DevolverSolicitudService } from './devolver-solicitud.service';
import { IDevuelveRequest } from './devolver-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

export interface DevolverConObservacionesData {
  [x: string]: any;
  solicitudId: number;
  fecha: string;
  ejecutivo: string;
  //motivoDevolucion: string;
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
  ],
  templateUrl: './devolver-solicitud.component.html',
  styleUrl: './devolver-solicitud.component.css'
})

  export class DevolverSolicitudComponent {
    constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DevolverSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) {}

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  idUsuario = this._storage()?.usuarioLogin.usuario!;
  devolverService = inject(DevolverSolicitudService);
  devolverRequest!: IDevuelveRequest;
  motivo = new FormControl('', [Validators.required]);
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

  devolver(): void {
    if(this.devolverSolicitud().get('motivo')!.value===''){
      return
    }

    this.devolverRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.idUsuario,
      p_tipo_usuario: this.idUsuario.substring(0,1),
      p_observacion: this.devolverSolicitud().get('motivo')!.value
    };
    this.devolverService
      .postDevuelveSolicitud(this.devolverRequest)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            this.confirmar();
          } else {
            this.notificacioAlertnService.error("ERROR",dato.mensaje);
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error("ERROR",'Error inesperado. '+ error);
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
