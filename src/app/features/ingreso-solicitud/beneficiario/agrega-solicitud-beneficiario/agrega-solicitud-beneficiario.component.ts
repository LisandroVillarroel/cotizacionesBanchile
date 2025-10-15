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
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { BeneficiarioService } from '@features/ingreso-solicitud/service/beneficiario.service';
import { IBeneficiario } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-agrega-solicitud-beneficiario',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './agrega-solicitud-beneficiario.component.html',
  styleUrl: './agrega-solicitud-beneficiario.component.css',
})
export class AgregaSolicitudBeneficiarioComponent {
  beneficiario!: IBeneficiario;
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  public readonly data = inject<string>(MAT_DIALOG_DATA);

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<AgregaSolicitudBeneficiarioComponent>
  );

  rutBeneficiario = new FormControl('', [Validators.required, this.validaRut]);
  nombreBeneficiario = new FormControl('', [Validators.required]);
  correoBeneficiario = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);
  telefonoBeneficiario = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(9\d{8}|22\d{7})$/),
  ]);
  regionBeneficiario = new FormControl('', [Validators.required]);
  ciudadBeneficiario = new FormControl('', [Validators.required]);
  comunaBeneficiario = new FormControl('', [Validators.required]);
  direccionBeneficiario = new FormControl('', [Validators.required]);
  numeroDireccionBeneficiario = new FormControl('', [Validators.required]);
  deptoDireccionBeneficiario = new FormControl('');
  casaBeneficiario = new FormControl('');

  agregaBeneficiario = signal<FormGroup>(
    new FormGroup({
      rutBeneficiario: this.rutBeneficiario,
      nombreBeneficiario: this.nombreBeneficiario,
      correoBeneficiario: this.correoBeneficiario,
      telefonoBeneficiario: this.telefonoBeneficiario,
      regionBeneficiario: this.regionBeneficiario,
      ciudadBeneficiario: this.ciudadBeneficiario,
      comunaBeneficiario: this.comunaBeneficiario,
      direccionBeneficiario: this.direccionBeneficiario,
      numeroDireccionBeneficiario: this.numeroDireccionBeneficiario,
      deptoDireccionBeneficiario: this.deptoDireccionBeneficiario,
      casaBeneficiario: this.casaBeneficiario,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'rutBeneficiario') {
      return this.rutBeneficiario.hasError('required')
        ? 'Debes ingresar rut beneficiario'
        : this.rutBeneficiario.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'nombreBeneficiario') {
      return this.nombreBeneficiario.hasError('required')
        ? 'Debes ingresar nombre'
        : '';
    }

    if (campo === 'correoBeneficiario') {
      if (this.correoBeneficiario.hasError('required')) {
        return 'Debes ingresar correo';
      }
      if (this.correoBeneficiario.hasError('pattern')) {
        return 'Debes ingresar un correo válido';
      }
    }

    if (campo === 'telefonoBeneficiario') {
      if (this.telefonoBeneficiario.hasError('required')) {
        return 'Debes ingresar teléfono';
      }
      if (this.telefonoBeneficiario.hasError('pattern')) {
        return 'Formato de teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'regionBeneficiario') {
      return this.regionBeneficiario.hasError('required')
        ? 'Debes ingresar región'
        : '';
    }

    if (campo === 'ciudadBeneficiario') {
      return this.ciudadBeneficiario.hasError('required')
        ? 'Debes ingresar ciudad'
        : '';
    }
    if (campo === 'comunaBeneficiario') {
      return this.comunaBeneficiario.hasError('required')
        ? 'Debes ingresar comuna'
        : '';
    }

    if (campo === 'direccionBeneficiario') {
      return this.direccionBeneficiario.hasError('required')
        ? 'Debes ingresar dirección'
        : '';
    }

    if (campo === 'numeroDireccionBeneficiario') {
      return this.numeroDireccionBeneficiario.hasError('required')
        ? 'Debes ingresar número dirección'
        : '';
    }

    if (campo === 'deptoDireccionBeneficiario') {
      return this.deptoDireccionBeneficiario.hasError('required')
        ? 'Debes ingresar departamento dirección'
        : '';
    }

    if (campo === 'casaBeneficiario') {
      return this.casaBeneficiario.hasError('required')
        ? 'Debes ingresar casa dirección'
        : '';
    }

    return '';
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  async onBlurRutBeneficiario(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaBeneficiario()
        .get('rutBeneficiario')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  grabar() {
    this.beneficiario = {
      p_id_solicitud: Number(this.data),
      p_rut_beneficiario:
        this.agregaBeneficiario().get('rutBeneficiario')!.value,
      p_nombre_razon_social_beneficiario:
        this.agregaBeneficiario().get('nombreBeneficiario')!.value,
      p_mail_beneficiario:
        this.agregaBeneficiario().get('correoBeneficiario')!.value,
      p_telefono_beneficiario: this.agregaBeneficiario().get(
        'telefonoBeneficiario'
      )!.value,
      p_region_beneficiario:
        this.agregaBeneficiario().get('regionBeneficiario')!.value,
      p_ciudad_beneficiario:
        this.agregaBeneficiario().get('ciudadBeneficiario')!.value,
      p_comuna_beneficiario:
        this.agregaBeneficiario().get('comunaBeneficiario')!.value,
      p_direccion_beneficiario: this.agregaBeneficiario().get(
        'direccionBeneficiario'
      )!.value,
      p_numero_dir_beneficiario: this.agregaBeneficiario().get(
        'numeroDireccionBeneficiario'
      )!.value,
      p_departamento_block_beneficiario: this.agregaBeneficiario().get(
        'deptoDireccionBeneficiario'
      )!.value,
      p_casa_beneficiario:
        this.agregaBeneficiario().get('casaBeneficiario')!.value,
      p_usuario_creacion: this._storage()?.usuarioLogin.usuario,
    };

    console.log('Beneficiario Grabado:', this.beneficiario);

    this.beneficiarioService
      .postAgregaBeneficiario(this.beneficiario)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            //alert('Grabó Beneficiario Bien');
            this.dialogRef.close('agregado');
          } else {
            alert('Error:' + dato.mensaje);
            console.log('Error:', dato.mensaje);
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }
}
