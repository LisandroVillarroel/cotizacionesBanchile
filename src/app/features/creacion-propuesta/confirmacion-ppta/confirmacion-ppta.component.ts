import { CreacionPropuestaComponent } from '@features/creacion-propuesta/creacion-propuesta.component';
import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { IRequest } from '@shared/modelo/servicios-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { GenerarPropuestaService } from '../generar-propuesta.service';

@Component({
  selector: 'app-confirmacion-ppta',
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
    CabeceraPopupComponente,
  ],
  templateUrl: './confirmacion-ppta.component.html',
  styleUrl: './confirmacion-ppta.component.css',
})
export class ConfirmacionPptaComponent {
  constructor(
    public dialogRef: MatDialogRef<CreacionPropuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequest,
  ) {}

  notificacioAlertnService = inject(NotificacioAlertnService);
  generarService = inject(GenerarPropuestaService);

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  generar(): void {
    this.generarService.postGeneraPropuesta(this.data).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          void this.notificacioAlertnService.confirmacion(
            'CONFIRMACIÓN',
            'La propuesta ha sido emitida exitosamente.',
          );
          this.dialogRef.close(true);
        }
      },
      error: () => {
        void this.notificacioAlertnService.error('ERROR', 'No fue posible emitir la propuesta.');
      },
    });
  }
}
