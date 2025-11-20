import { Component, inject, signal } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { ICompaniaSeguroEliminar } from '../compania-Interface';

@Component({
  selector: 'app-elimina-compania',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    CabeceraPopupComponente,
  ],
  templateUrl: './elimina-compania.component.html',
  styleUrls: ['./elimina-compania.component.css'],
})
export class EliminaCompaniaComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<EliminaCompaniaComponent>);
  private storage = inject(StorageService);

  private sesion = signal<ISesionInterface | null>(
    this.storage.get<ISesionInterface>('sesion')
  );

  public readonly data = inject(MAT_DIALOG_DATA); // Contiene la compañía seleccionada

  eliminar() {
    const payload = {
      p_id_usuario: 'ADM042',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.p_id_compania_seguro,
    };

    this.companiaService.postEliminarCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success(
            'Éxito',
            'Compañía eliminada correctamente'
          );
          this.dialogRef.close('eliminado');
        } else {
          this.notificacioAlertnService.error('ERROR', resp.vcEstadoCreacion);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }
}
