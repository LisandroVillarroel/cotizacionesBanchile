import { Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { AprobarSolicitudService } from './aprobar-solicitud.service';
import { IRequest } from '@shared/modelo/servicios-interface';

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
    @Inject(MAT_DIALOG_DATA) public data: IRequest,
  ) { }

  notificacioAlertnService = inject(NotificacioAlertnService);
  aprobarService = inject(AprobarSolicitudService);

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
