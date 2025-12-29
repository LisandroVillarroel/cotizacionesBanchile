import { Component, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { UsuarioService } from '../usuario.service';
import { DatosUsuarioLista, IUsuario, IUsuarioLista, IUsuarioUpd } from '../usuario-Interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cleanRut, formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { Jerarquia } from '@shared/utils/jerarquia';


@Component({
  selector: 'app-modifica-usuario',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    CabeceraPopupComponente],
  templateUrl: './modifica-usuario.component.html',
  styles: `
    .mat-mdc-form-field {
    width: 50% !important;
    padding-bottom: 25px;
    padding-right: 10px;
  }
  `
})
export class ModificaUsuarioComponent implements OnInit {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  private readonly dialogRef = inject(MatDialogRef<ModificaUsuarioComponent>);

  jerarquia = inject(Jerarquia);

  readonly data = inject(MAT_DIALOG_DATA);

  usuarioService = inject(UsuarioService);

  dependencia = signal<IUsuarioLista[]>([]);

  usuarioUpd!: IUsuarioUpd;
  codPerfil: string = "";

  ngOnInit() {
    this.idUsuario.setValue(String(this.data.p_id_usuario));
    this.idUsuario.disable();
    this.rutUsuario.setValue(this.data.p_rut_usuario);
    this.rutUsuario.disable();
    this.nombreUsuario.setValue(this.data.p_nombre_usuario);
    this.apePaternoUsuario.setValue(this.data.p_apellido_paterno_usuario);
    this.apeMaternoUsuario.setValue(this.data.p_apellido_materno_usuario);
    this.mailUsuario.setValue(this.data.p_mail_usuario);
    this.telefonoUsuario.setValue(this.data.p_telefono_usuario);
    this.tipoUsuario.setValue(this.data.p_tipo_usuario);
    this.dependenciaUsuario.setValue(this.data.p_id_dependencia_usuario);

    const anterior = this.jerarquia.jerarquiaAnterior(this.data.p_tipo_usuario);
    const codigoPerfil = anterior?.p_codigo_perfil ?? this.data.p_tipo_usuario;
    this.codPerfil = codigoPerfil;
    this.rescataLista(codigoPerfil);
  }

  idUsuario = new FormControl(this.data.p_id_usuario, [Validators.required]);
  rutUsuario = new FormControl(this.data.p_rut_usuario, [Validators.required, this.validaRut]);
  nombreUsuario = new FormControl(this.data.p_nombre_usuario, [Validators.required]);
  apePaternoUsuario = new FormControl(this.data.p_apellido_paterno_usuario, [Validators.required]);
  apeMaternoUsuario = new FormControl(this.data.p_apellido_materno_usuario, [Validators.required]);
  mailUsuario = new FormControl(this.data.p_mail_usuario, [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
  telefonoUsuario = new FormControl(this.data.p_telefono_usuario, [
    Validators.required,
    Validators.pattern(/^(9\d{8}|22\d{7})$/),
  ]);
  tipoUsuario = new FormControl(this.data.p_tipo_usuario, [Validators.required]);
  dependenciaUsuario = new FormControl(this.data.p_id_dependencia_usuario, [Validators.required]);
  estadoUsuario = new FormControl(this.data.p_estado_usuario, [Validators.required]);


  modificaUsuario = signal<FormGroup>(
    new FormGroup({
      idUsuario: this.idUsuario,
      rutUsuario: this.rutUsuario,
      nombreUsuario: this.nombreUsuario,
      apePaternoUsuario: this.apePaternoUsuario,
      apeMaternoUsuario: this.apeMaternoUsuario,
      mailUsuario: this.mailUsuario,
      telefonoUsuario: this.telefonoUsuario,
      dependenciaUsuario: this.dependenciaUsuario,
      tipoUsuario: this.tipoUsuario,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'idUsuario') {
      return this.idUsuario.hasError('required')
        ? 'Debes ingresar Id Usuario'
        : '';
    }
    if (campo === 'rutUsuario') {
      return this.rutUsuario.hasError('required')
        ? 'Debes ingresar Rut Usuario '
        : '';
    }
    if (campo === 'nombreUsuario') {
      return this.nombreUsuario.hasError('required')
        ? 'Debes ingresar Nombre Usuario'
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
        return 'Debes ingresar Correo';
      }
      if (this.mailUsuario.hasError('pattern')) {
        return 'Debes ingresar un Correo válido';
      }
    }

    if (campo === 'telefonoUsuario') {
      if (this.telefonoUsuario.hasError('required')) {
        return 'Debes ingresar Teléfono';
      }
      if (this.telefonoUsuario.hasError('pattern')) {
        return 'Formato de Teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'dependenciaUsuario') {
      return this.dependenciaUsuario.hasError('required')
        ? 'Debes seleccionar Dependencia'
        : '';
    }

    if (campo === 'tipoUsuario') {
      return this.tipoUsuario.hasError('required')
        ? 'Debes seleccionar Tipo de Usuario'
        : '';
    }
    return '';
  }



  async onBlurRutUsuario(event: Event) {
    const rut = (event.target as HTMLInputElement).value;

    if (validateRut(rut) === true) {
      await this.modificaUsuario()
        .get('rutUsuario')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });
    }
  }


  validaRut(control: FormControl): { [s: string]: boolean } | null {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null;

  }

  rescataLista(tipoConsulta: string) {
    this.usuarioService
      .postListadoUsuario(this._storage()!.usuarioLogin.usuario, this._storage()!.usuarioLogin.tipoUsuario!, tipoConsulta)
      .subscribe({
        next: (dato: DatosUsuarioLista) => {
          if (dato.codigo === 200) {
            console.log('Lista de Usuarios (modifica-usuario):', dato.p_cursor);
            this.dependencia.set(dato.p_cursor);
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
        },
      });
  }


  grabar() {
    const rutParaBD = formatRut(cleanRut(this.modificaUsuario().get('rutUsuario')!.value), RutFormat.DASH);

    this.usuarioUpd = {
      p_id_usuario: this._storage()?.usuarioLogin.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario ?? "",
      p_id_usuario_modif: this.modificaUsuario().get('idUsuario')!.value,
      p_tipo_usuario_modif: this.modificaUsuario().get('tipoUsuario')!.value,
      p_rut_usuario: rutParaBD,
      p_nombre_usuario: this.modificaUsuario().get('nombreUsuario')!.value,
      p_apellido_paterno_usuario: this.modificaUsuario().get('apePaternoUsuario')!.value,
      p_apellido_materno_usuario: this.modificaUsuario().get('apeMaternoUsuario')!.value,
      p_mail_usuario: this.modificaUsuario().get('mailUsuario')!.value,
      p_telefono_usuario: this.modificaUsuario().get('telefonoUsuario')!.value,
      p_id_dependencia_usuario: this.modificaUsuario().get('dependenciaUsuario')!.value,
      p_estado_usuario: "Vigente",
    };
    this.usuarioService.postModificaUsuario(this.usuarioUpd).subscribe({

      next: (dato: any) => {
        if (Number(dato.codigo) === 200) {
          this.dialogRef.close('modificado');
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }
}
