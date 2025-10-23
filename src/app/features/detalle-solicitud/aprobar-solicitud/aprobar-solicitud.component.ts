import { Component, Inject, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { AprobarSolicitudService } from './aprobar-solicitud.service';
import { IApruebaRequest } from './aprobar-interface';

@Component({
  selector: 'app-aprobar-solicitud',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatDivider,
    MatTooltipModule,
    ReactiveFormsModule,
    CabeceraPopupComponente
  ],
  templateUrl: './aprobar-solicitud.component.html',
  styleUrls: ['./aprobar-solicitud.component.css']
})
export class AprobarSolicitudComponent {

  constructor(public dialogRef: MatDialogRef<AprobarSolicitudComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IApruebaRequest,
      private dialog: MatDialog
    ) { }

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  idUsuario = this._storage()?.usuarioLogin.usuario!;
  aprobarService = inject(AprobarSolicitudService);
  apruebaRequest!: IApruebaRequest;

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  aprobar(): void {
    this.aprobarService
      .postApruebaSolicitud(this.data)
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
              "La solicitud ha sido aprobada exitosamente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

}
