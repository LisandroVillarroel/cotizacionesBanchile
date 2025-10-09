import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
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
import { FormControl, FormGroup, FormsModule,
  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { MatTooltipModule } from '@angular/material/tooltip';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { AnularSolicitudService } from './anular-solicitud.service';
import { IAnulaRequest } from './anular-interface';

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
  ],
  templateUrl: './anular-solicitud.component.html',
  styleUrl: './anular-solicitud.component.css'
})
export class AnularSolicitudComponent {
  constructor(
    public dialogRef: MatDialogRef<AnularSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudComponent,
    private dialog: MatDialog
  ) { }

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;
  anularService = inject(AnularSolicitudService);
  anulaRequest!: IAnulaRequest;
  motivo = new FormControl('', [Validators.required]);
  anularSolicitud= signal<FormGroup>(
    new FormGroup({
        motivo: this.motivo
    }));

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  anular(): void {
    if(this.anularSolicitud().get('motivo')!.value===''){
      return
    }
    this.anulaRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.idUsuario,
      p_tipo_usuario: this.idUsuario.substring(0,1),
      p_observacion: this.anularSolicitud().get('motivo')!.value
    };

    this.anularService
      .postAnulaSolicitud(this.anulaRequest)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            Swal.fire({
              title: 'La solicitud ha sido anulada exitosamente.',
              icon: 'success',
              confirmButtonColor: "#002464",
              draggable: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(true);
              }
            });
          } else {
            Swal.fire({
              title: dato.mensaje,
              icon: 'error',
              confirmButtonColor: "#002464",
              draggable: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(true);
              }
            });
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Error inesperado. '+ error,
            icon: 'error',
            confirmButtonColor: "#002464",
            draggable: false
          }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(true);
              }
          });
        },
      });
  }

  getErrorMessage() {
    return this.motivo.hasError('required')
    ? 'Debe ingresar el motivo de la anulación.' : '';
  }
}
