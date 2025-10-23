import {
  Component,
  Inject,
  inject,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { IRequestG } from '@shared/modelo/servicios-interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { MatInputModule } from '@angular/material/input';
import { EnviarCompaniasService } from './enviar-companias.service';

@Component({
  selector: 'app-enviar-a-compania',
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
  templateUrl: './enviar-a-compania.component.html',
  styleUrl: './enviar-a-compania.component.css',
})

export class EnviarACompaniaComponent {

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EnviarACompaniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequestG
  ) {}

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;

  notificacioAlertnService = inject(NotificacioAlertnService);
  enviarCoordinadorService = inject(EnviarCompaniasService);
  enviarRequest!: IRequestG;

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  enviar(): void {
    this.enviarCoordinadorService
      .postEnviaSolicitud(this.data)
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
    const result = await this.notificacioAlertnService
        .confirmacion("La solicitud ha sido enviada exitosamente","");
    if (result) {
      this.dialogRef.close(true);
    }
  }
}
