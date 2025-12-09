import { Component, inject, signal } from '@angular/core';
import CabeceraPopupComponente from '../../../../shared/ui/cabeceraPopup.component';
import {
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { IAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-agrega-rubro',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './agrega-rubro.component.html',
  styleUrl: './agrega-rubro.component.css',
})
export class AgregaRubroComponent {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  aseguradoService = inject(AseguradoService);

  asegurado!: IAsegurado;
  private readonly dialogRef = inject(MatDialogRef<AgregaRubroComponent>);

  id = new FormControl('', [Validators.required]);
  fCreacion = new FormControl('', [Validators.required]);
  nombre_rubro = new FormControl('', [Validators.required]);
  usuario_creacion = new FormControl('', [Validators.required]);
  estado_rubro = new FormControl('', [Validators.required]);
  fecha_modificacion = new FormControl('', [Validators.required]);
  usuario_modificacion = new FormControl('', [Validators.required]);

  agregaAsegurado = signal<FormGroup>(
    new FormGroup({
      id: this.id,
      fCreacion: this.fCreacion,
      nombre_rubro: this.nombre_rubro,
      usuario_creacion: this.usuario_creacion,
      estado_rubro: this.estado_rubro,
      fecha_modificacion: this.fecha_modificacion,
      usuario_modificacion: this.usuario_modificacion,
    }),
  );

  getErrorMessage(campo: string) {
    if (campo === 'nombre_rubro') {
      return this.nombre_rubro.hasError('required') ? 'Debes ingresar Nombre Rubro' : '';
    }
    return '';
  }
}
