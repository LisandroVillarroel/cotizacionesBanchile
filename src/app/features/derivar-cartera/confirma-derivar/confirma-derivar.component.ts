import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IRequestDeriva } from '../cartera-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { CarteraService } from '../cartera.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-confirma-derivar',
  templateUrl: './confirma-derivar.component.html',
  styleUrls: ['./confirma-derivar.component.css'],
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
})
export class ConfirmaDerivarComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmaDerivarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequestDeriva,
  ) { }

  notificacioAlertnService = inject(NotificacioAlertnService);

  derivaService = inject(CarteraService);
  derivaRequest!: IRequestDeriva;


  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  derivar(): void {
    this.derivaService.postDerivarCartera(this.data)
      .subscribe({
        next: async (dato) => {
          if (dato.codigo === 200) {
            const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
                      "La solicitud ha sido derivada exitosamente.");
            if (result) {
              this.dialogRef.close(true);
            }
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','No fue posible derivar la cartera de solicitudes.');
        },
      });
  }
}
