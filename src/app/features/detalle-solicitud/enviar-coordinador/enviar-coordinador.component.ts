import { EnviarCoordinadorService } from './enviar-coordinador.service';
import { Component, Inject, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { MatIconModule } from '@angular/material/icon';
import { IRequest } from '@shared/modelo/servicios-interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-enviar-coordinador',
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
  templateUrl: './enviar-coordinador.component.html',
  styleUrls: ['./enviar-coordinador.component.css']
})

export class EnviarCoordinadorComponent {

  constructor(
    public dialogRef: MatDialogRef<EnviarCoordinadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequest,
  ) { }

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
    console.log("Entradas Enviar a Coordinador: ", this.data) //borrar después de probar ingreso
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
