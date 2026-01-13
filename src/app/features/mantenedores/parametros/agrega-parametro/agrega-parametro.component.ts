import { Component, inject, signal } from '@angular/core';
import CabeceraPopupComponente from "../../../../shared/ui/cabeceraPopup.component";
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from "@angular/material/form-field";
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { IParametro } from '../parametro-Interface';
import { ParametrosService } from '../parametro.service';
import { CommonModule } from '@angular/common';
import { IResponse } from '@shared/modelo/servicios-interface';

@Component({
  selector: 'app-agrega-parametro',
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
      MatSelectModule,
      CommonModule],
  templateUrl: './agrega-parametro.component.html',
  styleUrl: './agrega-parametro.component.css'
})
export class AgregaParametroComponent {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<IParametro>(MAT_DIALOG_DATA);

  parametroService = inject(ParametrosService);
  parametro!: IParametro;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaParametroComponent>
  );

  id = new FormControl('', [Validators.required]);
  nombre_parametro = new FormControl('', [Validators.required]);
  usuario_creacion = new FormControl('', [Validators.required]);

  agregaParametro = signal<FormGroup>(
    new FormGroup({
      nombre_parametro: this.nombre_parametro,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'nombre_parametro') {
      return this.nombre_parametro.hasError('required')
        ? 'Debes ingresar Nombre Parámetro'
        : '';
    }
    return '';
  }
  grabar() {
    //Convertir a formato BD (sin puntos, con guion)
    // const rutParaBD = formatRut(cleanRut(this.agregaUsuario().get('rutUsuarioNuevo')!.value), RutFormat.DASH);

    this.parametro = {
      p_id_usuario: this._storage()?.usuarioLogin?.usuario as string,
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario as string,
      p_nombre_parametro: this.agregaParametro().get('nombre_parametro')!.value,
    };

    this.parametroService.postAgregaParametro(this.parametro).subscribe({
      next: (dato: IResponse) => {
        if (dato.codigo === 200) {
          this.dialogRef.close('agregado');
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }
}
