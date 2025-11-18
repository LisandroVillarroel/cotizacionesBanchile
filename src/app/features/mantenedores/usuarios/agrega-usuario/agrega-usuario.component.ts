import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { IUsuario } from '../usuario-Interface';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-agrega-usuario',
  standalone: true,
  imports: [   CommonModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      CabeceraPopupComponente,],
  templateUrl: './agrega-usuario.component.html',
  styleUrl: './agrega-usuario.component.css'
})
export class AgregaUsuarioComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  aseguradoService = inject(AseguradoService);

  usuario!: IUsuario;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaUsuarioComponent>
  );

  tipoUsuario = new FormControl('', [Validators.required, this.validaRut]);
  idUsuario = new FormControl('', [Validators.required]);
  rutUsuario = new FormControl('', [Validators.required, this.validaRut]);
  nombreUsuario = new FormControl('', [Validators.required]);
  apePaternoUsuario = new FormControl('', [Validators.required])
  apeMaternoUsuario = new FormControl('', [Validators.required]);
  mailUsuario = new FormControl('', [Validators.required,
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
      mailUsuario: this.mailUsuario,
      telefonoUsuario: this.telefonoUsuario,
      dependenciaUsuario: this.dependenciaUsuario,
      idPerfil: this.idPerfil,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'rutUsuario') {
      return this.rutUsuario.hasError('required')
        ? 'Debes ingresar rut usuario'
        : this.rutUsuario.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'nombreUsuario') {
      return this.nombreUsuario.hasError('required')
        ? 'Debes ingresar Nombre'
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
        ? 'Debes ingresar perfil'
        : '';
    }


    return '';
  }

  //Éste es el método antiguo para formatear rut con puntos y guión
  /* async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  } */

  //Éste es el método para formatear rut con puntos y guión y guarda el rut sin puntos y con guion en BD
  /* async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      //Mostrar en el input con puntos y guion
      await this.agregaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });

      //Guardar en BD sin puntos y con guion
      formatRut(cleanRut(rut), RutFormat.DASH);
    }
  } */

  //Éste es el método formatear rut con puntos y guión, guarda el rut sin puntos y con guion en BD y carga datos del mock en agregar asegurado
  async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      // Formatear el RUT visualmente
      await this.agregaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });

      // Formato para BD
      const rutParaBD = formatRut(cleanRut(rut), RutFormat.DASH);

      if (rutParaBD === '11898216-9') {
        this.aseguradoService.getDatosAsegurado(rutParaBD).subscribe({
          next: (response: any) => {
            if (response.codigo === 200 && response.data) {
              const data = response.data;

              this.agregaAsegurado().patchValue({
                nombreAsegurado: `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`,
                correoAsegurado: data.emailEjecutivo || '',
                telefonoAsegurado: data.celularParticularCliente || '',
                regionAsegurado: data.region || '',
                ciudadAsegurado: data.ciudad || '',
                comunaAsegurado: data.comuna || '',
                direccionAsegurado: data.direccion || '',
                numeroDireccionAsegurado: data.numeroDireccion || '',
                deptoDireccionAsegurado: data.complementoDireccion || '',
                casaAsegurado: data.numeroDireccion || '',
              });
            }
          },
          error: () => {
            this.notificacioAlertnService.error(
              'ERROR',
              'Error al consultar datos del asegurado'
            );
          },
        });
      } else {
        this.agregaAsegurado().patchValue({
          nombreAsegurado: '',
          correoAsegurado: '',
          telefonoAsegurado: '',
          regionAsegurado: '',
          ciudadAsegurado: '',
          comunaAsegurado: '',
          direccionAsegurado: '',
          numeroDireccionAsegurado: '',
          deptoDireccionAsegurado: '',
          casaAsegurado: '',
        });
      }
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  grabar() {
    const rutVisual = this.agregaAsegurado().get('rutAsegurado')!.value;

    //Convertir a formato BD (sin puntos, con guion)
    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    this.asegurado = {
      p_id_solicitud: Number(this.data),
      p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
      //p_rut_asegurado: this.agregaAsegurado().get('rutAsegurado')!.value,
      p_rut_asegurado: rutParaBD,
      p_nombre_razon_social_asegurado:
        this.agregaAsegurado().get('nombreAsegurado')!.value,
      p_mail_asegurado: this.agregaAsegurado().get('correoAsegurado')!.value,
      p_telefono_asegurado:
        this.agregaAsegurado().get('telefonoAsegurado')!.value,
      p_region_asegurado: this.agregaAsegurado().get('regionAsegurado')!.value,
      p_ciudad_asegurado: this.agregaAsegurado().get('ciudadAsegurado')!.value,
      p_comuna_asegurado: this.agregaAsegurado().get('comunaAsegurado')!.value,
      p_direccion_asegurado:
        this.agregaAsegurado().get('direccionAsegurado')!.value,
      p_numero_dir_asegurado: this.agregaAsegurado().get(
        'numeroDireccionAsegurado'
      )!.value,
      p_departamento_block_asegurado: this.agregaAsegurado().get(
        'deptoDireccionAsegurado'
      )!.value,
      p_casa_asegurado: this.agregaAsegurado().get('casaAsegurado')!.value,
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
