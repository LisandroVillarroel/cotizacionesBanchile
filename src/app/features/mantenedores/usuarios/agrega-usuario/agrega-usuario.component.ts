import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { IUsuario, IUsuarioLista } from '../usuario-Interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cleanRut, formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { MatSelectModule } from '@angular/material/select';
import { IResponse } from '@shared/modelo/servicios-interface';

@Component({
  selector: 'app-agrega-usuario',
  standalone: true,
  imports: [  CommonModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatSelectModule,
      CabeceraPopupComponente,],
  templateUrl: './agrega-usuario.component.html',
  styleUrl: './agrega-usuario.component.css'
})
export class AgregaUsuarioComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  usuarioService = inject(UsuarioService);

  dependencia = signal<IUsuarioLista[]>([]);

  usuario!: IUsuario;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaUsuarioComponent>
  );


  idUsuarioNuevo = new FormControl('', [Validators.required]);
  rutUsuarioNuevo = new FormControl('', [Validators.required, this.validaRut]);
  nombreUsuarioNuevo = new FormControl('', [Validators.required]);
  apePaternoUsuarioNuevo = new FormControl('', [Validators.required]);
  apeMaternoUsuarioNuevo = new FormControl('', [Validators.required]);
  mailUsuarioNuevo = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
  telefonoUsuarioNuevo = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(9\d{8}|22\d{7})$/),
  ]);
  tipoUsuarioNuevo = new FormControl('', [Validators.required]);
  dependenciaUsuarioNuevo = new FormControl('', [Validators.required]);


  agregaUsuario = signal<FormGroup>(
    new FormGroup({
      idUsuarioNuevo: this.idUsuarioNuevo,
      rutUsuarioNuevo: this.rutUsuarioNuevo,
      nombreUsuarioNuevo: this.nombreUsuarioNuevo,
      apePaternoUsuarioNuevo: this.apePaternoUsuarioNuevo,
      apeMaternoUsuarioNuevo: this.apeMaternoUsuarioNuevo,
      mailUsuarioNuevo: this.mailUsuarioNuevo,
      telefonoUsuarioNuevo: this.telefonoUsuarioNuevo,
      dependenciaUsuarioNuevo: this.dependenciaUsuarioNuevo,
      tipoUsuarioNuevo: this.tipoUsuarioNuevo,

    })
  );

  getErrorMessage(campo: string) {
     if (campo === 'idUsuarioNuevo') {
      return this.idUsuarioNuevo.hasError('required')
        ? 'Debes ingresar Id Usuario'
        : '';
    }
     if (campo === 'rutUsuarioNuevo') {
      return this.rutUsuarioNuevo.hasError('required')
        ? 'Debes ingresar Rut Usuario '
        : '';
    }
     if (campo === 'nombreUsuarioNuevo') {
      return this.nombreUsuarioNuevo.hasError('required')
        ? 'Debes ingresar Nombre Usuario'
        : '';
    }
     if (campo === 'apePaternoUsuarioNuevo') {
      return this.apePaternoUsuarioNuevo.hasError('required')
        ? 'Debes ingresar Apellido Paterno'
        : '';
    }
     if (campo === 'apeMaternoUsuarioNuevo') {
      return this.apeMaternoUsuarioNuevo.hasError('required')
        ? 'Debes ingresar Apellido Materno'
        : '';
    }

    if (campo === 'mailUsuarioNuevo') {
      if (this.mailUsuarioNuevo.hasError('required')) {
        return 'Debes ingresar Correo';
      }
      if (this.mailUsuarioNuevo.hasError('pattern')) {
        return 'Debes ingresar un Correo válido';
      }
    }

    if (campo === 'telefonoUsuarioNuevo') {
      if (this.telefonoUsuarioNuevo.hasError('required')) {
        return 'Debes ingresar Teléfono';
      }
      if (this.telefonoUsuarioNuevo.hasError('pattern')) {
        return 'Formato de Teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'dependenciaUsuarioNuevo') {
      return this.dependenciaUsuarioNuevo.hasError('required')
        ? 'Debes seleccionar Dependencia'
        : '';
    }

    if (campo === 'tipoUsuarioNuevo') {
      return this.tipoUsuarioNuevo.hasError('required')
        ? 'Debes seleccionar Tipo de Usuario'
        : '';
    }

    return '';
  }



  //Éste es el método formatear rut con puntos y guión, guarda el rut sin puntos y con guion en BD y carga datos del mock en agregar asegurado
  async onBlurRutUsuarioNuevo(event: Event) {
    const input = event.target as HTMLInputElement;
    const rut = input.value;

    if (validateRut(rut) === true) {
      // Formatear el RUT visualmente
      await this.agregaUsuario()
        .get('rutUsuarioNuevo')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });

      // Formato para BD
      //const rutParaBD = formatRut(cleanRut(rut), RutFormat.DASH);
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  grabar() {
    //Convertir a formato BD (sin puntos, con guion)
    const rutParaBD = formatRut(cleanRut(this.agregaUsuario().get('rutUsuarioNuevo')!.value), RutFormat.DASH);

    this.usuario = {
      p_id_usuario_nuevo: this.agregaUsuario().get('idUsuarioNuevo')!.value,
      p_tipo_usuario_nuevo: this.agregaUsuario().get('tipoUsuarioNuevo')!.value,
      p_rut_usuario_nuevo: rutParaBD,
      p_nombre_usuario_nuevo: this.agregaUsuario().get('nombreUsuarioNuevo')!.value,
      p_apellido_paterno_usuario_nuevo: this.agregaUsuario().get('apePaternoUsuarioNuevo')!.value,
      p_apellido_materno_usuario_nuevo: this.agregaUsuario().get('apeMaternoUsuarioNuevo')!.value,
      p_mail_usuario_nuevo: this.agregaUsuario().get('mailUsuarioNuevo')!.value,
      p_telefono_usuario_nuevo: this.agregaUsuario().get('telefonoUsuarioNuevo')!.value,
      p_id_dependencia_usuario_nuevo: this.agregaUsuario().get('dependenciaUsuarioNuevo')!.value,
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? ""
    };


    this.usuarioService.postAgregaUsuario(this.usuario).subscribe({
      next: (dato: IResponse) => {
        //console.log('dato:', dato);
        if (dato.codigo === 200) {
          //alert('Grabó Usuario Bien');
          this.dialogRef.close('agregado');
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible agregar al usuario.');
      },
    });
  }
}
