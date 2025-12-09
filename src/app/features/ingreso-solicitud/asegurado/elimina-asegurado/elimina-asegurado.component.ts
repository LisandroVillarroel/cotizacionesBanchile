import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  IAsegurado,
  IAseguradoListaParametro,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-elimina-asegurado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './elimina-asegurado.component.html',
  styleUrl: './elimina-asegurado.component.css',
})
export class EliminaAseguradoComponent {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  aseguradoService = inject(AseguradoService);
  asegurado!: IAsegurado;

  private readonly dialogRef = inject(MatDialogRef<EliminaAseguradoComponent>);
  public readonly data = inject<IAseguradoListaParametro>(MAT_DIALOG_DATA);

  eliminar() {
    this.aseguradoService
      .postEliminaAsegurado(Number(this.data.idSolicitud), this.data.datoAseguradoPar.rutAsegurado)
      .subscribe({
        next: (dato) => {
          //console.log('dato:', dato);
          if (dato.codigo === 200) {
            //alert('Eliminó Asegurado Bien');
            this.dialogRef.close('eliminado');
          }
        },
        error: () => {
          void this.notificacioAlertnService.error(
            'ERROR',
            'No fue posible eliminar al asegurado.',
          );
        },
      });
  }
}
