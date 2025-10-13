import { EnviarCoordinadorService } from './enviar-coordinador.service';
import { Component, Inject, OnInit, inject, signal} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import DetalleSolicitudComponent from '../detalle-solicitud.component';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { MatIconModule } from '@angular/material/icon';
import { IRequest } from '@shared/modelo/servicios-interface';

export interface EnviarCoordinadorData {
  [x: string]: any;
  solicitudId: number;
  fecha: string;
  ejecutivo: string;
}

@Component({
  selector: 'app-enviar-coordinador',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    // MatFormField,
    MatInputModule,
    FormsModule,
    MatDivider,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './enviar-coordinador.component.html',
  styleUrls: ['./enviar-coordinador.component.css']
})
export class EnviarCoordinadorComponent {

  constructor(
    public dialogRef: MatDialogRef<EnviarCoordinadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EnviarCoordinadorData,
    private dialog: MatDialog
  ) { }

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;

  notificacioAlertnService = inject(NotificacioAlertnService);
  enviarCoordinadorService = inject(EnviarCoordinadorService);
  enviarRequest!: IRequest;

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  enviar(): void {
    this.enviarRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.idUsuario,
    };
    this.enviarCoordinadorService
      .postEnviaSolicitud(this.enviarRequest)
      .subscribe({
        next: (dato) => {
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
    const result = await this.notificacioAlertnService.confirmacion("La solicitud ha sido enviada exitosamente",
              "La solicitud nro. "+ this.data.solicitudId + "se ha enviado con éxito.\n" +
              "Puedes seguir su estado desde el Menú de Gestión de Solicitudes. \n"+
              "El coordinador responsable será notificado y revisará que la \n"+
              "información esté completa y correcta. \n"+
              "Una vez aprobada podrá continuar con el proceso  correspondiente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

}
