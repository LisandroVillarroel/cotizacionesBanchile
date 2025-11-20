import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { UsuarioService } from '../usuario.service';
import { IUsuario } from '../usuario-Interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cleanRut, formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-agrega-usuario',
  standalone: true,
  imports: [],
  templateUrl: './agrega-usuario.component.html',
  styleUrl: './agrega-usuario.component.css'
})
export class AgregaUsuarioComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  usuarioService = inject(UsuarioService);

  usuario!: IUsuario;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaUsuarioComponent>
  );

  tipoUsuario = new FormControl('', [Validators.required]);
  idUsuario = new FormControl('', [Validators.required]);
  rutUsuario = new FormControl('', [Validators.required, this.validaRut]);
  nombreUsuario = new FormControl('', [Validators.required]);
  apePaternoUsuario = new FormControl('', [Validators.required]);
  apeMaternoUsuario = new FormControl('', [Validators.required]);
  mailUsuario = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
  telefonoUsuario = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(9\d{8}|22\d{7})$/),
  ]);
  dependenciaUsuario = new FormControl('', [Validators.required]);
  idPerfil = new FormControl('', [Validators.required]);


  agregaUsuario = signal<FormGroup>(
    new FormGroup({
      tipoUsuario: this.tipoUsuario,
      idUsuario: this.idUsuario,
      rutUsuario: this.rutUsuario,
      nombreUsuario: this.nombreUsuario,
      apePaternoUsuario: this.apePaternoUsuario,
      apeMaternoUsuario: this.apeMaternoUsuario,
      mailUsuario: this.mailUsuario,
      telefonoUsuario: this.telefonoUsuario,
      dependenciaUsuario: this.dependenciaUsuario,
      idPerfil: this.idPerfil,

    })
  );

  getErrorMessage(campo: string) {
     if (campo === 'tipoUsuario') {
      return this.tipoUsuario.hasError('required')
        ? 'Debes ingresar tipo Usuario'
        : '';
    }
     if (campo === 'idUsuario') {
      return this.idUsuario.hasError('required')
        ? 'Debes ingresar id Usuario '
        : '';
    }
     if (campo === 'rutUsuario') {
      return this.rutUsuario.hasError('required')
        ? 'Debes ingresar Rut Usuario'
        : this.rutUsuario.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
     if (campo === 'nombreUsuario') {
      return this.nombreUsuario.hasError('required')
        ? 'Debes ingresar nombre Usuario'
        : '';
    }
     if (campo === 'apePaternoUsuario') {
      return this.apePaternoUsuario.hasError('required')
        ? 'Debes ingresar Apellido Paterno'
        : '';
    }
    if (campo === 'apeMaternoUsuario') {
      return this.apeMaternoUsuario.hasError('required')
        ? 'Debes ingresar Apellido Materno'
        : '';
    }

    if (campo === 'mailUsuario') {
      if (this.mailUsuario.hasError('required')) {
        return 'Debes ingresar correo';
      }
      if (this.mailUsuario.hasError('pattern')) {
        return 'Debes ingresar un correo válido';
      }
    }

    if (campo === 'telefonoUsuario') {
      if (this.telefonoUsuario.hasError('required')) {
        return 'Debes ingresar teléfono';
      }
      if (this.telefonoUsuario.hasError('pattern')) {
        return 'Formato de teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'dependenciaUsuario') {
      return this.dependenciaUsuario.hasError('required')
        ? 'Debes ingresar dependencia'
        : '';
    }

    if (campo === 'idPerfil') {
      return this.idPerfil.hasError('required')
        ? 'Debes ingresar id Perfil'
        : '';
    }

    return '';
  }



  //Éste es el método formatear rut con puntos y guión, guarda el rut sin puntos y con guion en BD y carga datos del mock en agregar asegurado
  async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      // Formatear el RUT visualmente
      await this.agregaUsuario()
        .get('rutAsegurado')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });

      // Formato para BD
      const rutParaBD = formatRut(cleanRut(rut), RutFormat.DASH);
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
    const rutParaBD = formatRut(cleanRut(this.agregaUsuario().get('rutUsuario')!.value), RutFormat.DASH);


    p_tipo_usuario: string;
  p_id_usuario: string;
  p_rut_usuario: string;
  p_nombre_usuario: string;
  p_apellido_paterno_usuario: string;
  p_apellido_materno_usuario: string;
  p_mail_usuario: string;
  p_telefono_usuario: string;
  p_id_dependencia_usuario: string;
  p_id_perfil: string;

    this.usuario = {
      p_rut_usuario: rutParaBD,
      p_nombre_usuario: this.agregaUsuario().get('nombreUsuario')!.value,
      p_apellido_paterno_usuario: this.agregaUsuario().get('apePaternoUsuario')!.value,
      p_apellido_materno_usuario: this.agregaUsuario().get('apeMaternoUsuario')!.value,
      p_mail_usuario: this.agregaUsuario().get('mailUsuario')!.value,
      p_telefono_usuario: this.agregaUsuario().get('telefonoUsuario')!.value,
      p_id_dependencia_usuario: this.agregaUsuario().get('dependenciaUsuario')!.value,
      idPerfil:  this.agregaUsuario().get('idPerfil')!.value,
      p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
    };

    console.log('Asegurado Grabado:', this.asegurado);

    this.aseguradoService.postAgregaAsegurado(this.asegurado).subscribe({
      next: (dato) => {
        console.log('dato:', dato);
        if (dato.codigo === 200) {
          //alert('Grabó Asegurado Bien');
          this.dialogRef.close('agregado');
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }
}
