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
import { MatInputModule } from '@angular/material/input';
import {
  validateRut,
  formatRut,
  RutFormat,
  cleanRut,
} from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { IAsegurado, IDatosPersona } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-agrega-asegurado',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './agrega-asegurado.component.html',
  styleUrl: './agrega-asegurado.component.css',
})
export class AgregaAseguradoComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  aseguradoService = inject(AseguradoService);

  asegurado!: IAsegurado;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaAseguradoComponent>
  );

  rutAsegurado = new FormControl('', [Validators.required, this.validaRut]);
  nombreAsegurado = new FormControl('', [Validators.required]);
  correoAsegurado = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
  telefonoAsegurado = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(9\d{8}|22\d{7})$/),
  ]);
  regionAsegurado = new FormControl('', [Validators.required]);
  ciudadAsegurado = new FormControl('', [Validators.required]);
  comunaAsegurado = new FormControl('', [Validators.required]);
  direccionAsegurado = new FormControl('', [Validators.required]);
  numeroDireccionAsegurado = new FormControl('', [Validators.required]);
  deptoDireccionAsegurado = new FormControl('');
  casaAsegurado = new FormControl('');

  agregaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
      correoAsegurado: this.correoAsegurado,
      telefonoAsegurado: this.telefonoAsegurado,
      regionAsegurado: this.regionAsegurado,
      ciudadAsegurado: this.ciudadAsegurado,
      comunaAsegurado: this.comunaAsegurado,
      direccionAsegurado: this.direccionAsegurado,
      numeroDireccionAsegurado: this.numeroDireccionAsegurado,
      deptoDireccionAsegurado: this.deptoDireccionAsegurado,
      casaAsegurado: this.casaAsegurado,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'rutAsegurado') {
      return this.rutAsegurado.hasError('required')
        ? 'Debes ingresar rut asegurado'
        : this.rutAsegurado.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'nombreAsegurado') {
      return this.nombreAsegurado.hasError('required')
        ? 'Debes ingresar nombre'
        : '';
    }

    if (campo === 'correoAsegurado') {
      if (this.correoAsegurado.hasError('required')) {
        return 'Debes ingresar correo';
      }
      if (this.correoAsegurado.hasError('pattern')) {
        return 'Debes ingresar un correo válido';
      }
    }

    if (campo === 'telefonoAsegurado') {
      if (this.telefonoAsegurado.hasError('required')) {
        return 'Debes ingresar teléfono';
      }
      if (this.telefonoAsegurado.hasError('pattern')) {
        return 'Formato de teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'regionAsegurado') {
      return this.regionAsegurado.hasError('required')
        ? 'Debes ingresar región'
        : '';
    }

    if (campo === 'ciudadAsegurado') {
      return this.ciudadAsegurado.hasError('required')
        ? 'Debes ingresar ciudad'
        : '';
    }
    if (campo === 'comunaAsegurado') {
      return this.comunaAsegurado.hasError('required')
        ? 'Debes ingresar Comuna'
        : '';
    }

    if (campo === 'direccionAsegurado') {
      return this.direccionAsegurado.hasError('required')
        ? 'Debes ingresar dirección'
        : '';
    }

    if (campo === 'numeroDireccionAsegurado') {
      return this.numeroDireccionAsegurado.hasError('required')
        ? 'Debes ingresar número dirección'
        : '';
    }

    if (campo === 'deptoDireccionAsegurado') {
      return this.deptoDireccionAsegurado.hasError('required')
        ? 'Debes ingresar departamento dirección'
        : '';
    }

    if (campo === 'casaAsegurado') {
      return this.casaAsegurado.hasError('required')
        ? 'Debes ingresar número casa dirección'
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
  async onBlurRutAsegurado(event: Event) {
    const input = event.target as HTMLInputElement;
    const rut = input.value;

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
          next: (response: IDatosPersona) => {
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
    return { rutInvalido: false };
  }

  grabar() {
    const rutVisual = this.agregaAsegurado().get('rutAsegurado')!.value;

    //Convertir a formato BD (sin puntos, con guion)
    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    this.asegurado = {
      p_id_solicitud: Number(this.data),
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? "",
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

    //console.log('Asegurado Grabado:', this.asegurado);

    this.aseguradoService.postAgregaAsegurado(this.asegurado).subscribe({
      next: (dato) => {
      //  console.log('dato:', dato);
        if (dato.codigo === 200) {
          //alert('Grabó Asegurado Bien');
          this.dialogRef.close('agregado');
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible agregar al asegurado.');
      },
    });
  }
}
