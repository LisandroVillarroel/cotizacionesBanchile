import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import {
  IAsegurado,
  IAseguradoLista,
  IAseguradoListaParametro,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';

@Component({
  selector: 'app-elimina-solicitud-asegurado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './elimina-solicitud-asegurado.component.html',
  styleUrl: './elimina-solicitud-asegurado.component.css',
})
export class EliminaSolicitudAseguradoComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService= inject(NotificacioAlertnService);

  aseguradoService = inject(AseguradoService);
  asegurado!: IAsegurado;

  private readonly dialogRef = inject(
    MatDialogRef<EliminaSolicitudAseguradoComponent>
  );
  public readonly data = inject<IAseguradoListaParametro>(MAT_DIALOG_DATA);

  eliminar() {
    this.aseguradoService
      .postEliminaAsegurado(
        Number(this.data.idSolicitud),
        this.data.datoAseguradoPar.rutAsegurado
      )
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            //alert('Eliminó Asegurado Bien');
            this.dialogRef.close('eliminado');
          }

        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }
}
