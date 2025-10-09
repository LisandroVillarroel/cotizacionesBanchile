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
import {
  IAgregaBeneficiario,
  IBeneficiarioListaParametro,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '@features/ingreso-solicitud/service/beneficiario.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';

@Component({
  selector: 'app-modifica-solicitud-beneficiario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './modifica-solicitud-beneficiario.component.html',
  styleUrl: './modifica-solicitud-beneficiario.component.css',
})
export class ModificaSolicitudBeneficiarioComponent {
  beneficiario!: IAgregaBeneficiario;
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<ModificaSolicitudBeneficiarioComponent>
  );

  readonly data = inject<IBeneficiarioListaParametro>(MAT_DIALOG_DATA);

  rutBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.rut_beneficiario,
    [Validators.required, this.validaRut]
  );
  nombreBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.nombre_razon_social_beneficiario,
    [Validators.required]
  );

  correoBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.mail_beneficiario,
    [Validators.required]
  );

  telefonoBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.telefono_beneficiario,
    [Validators.required]
  );

  regionBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.region_beneficiario,
    [Validators.required]
  );
  ciudadBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.ciudad_beneficiario,
    [Validators.required]
  );
  comunaBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.comuna_beneficiario,
    [Validators.required]
  );
  direccionBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.direccion_beneficiario,
    [Validators.required]
  );
  numeroDireccionBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.numero_dir_beneficiario,
    [Validators.required]
  );
  deptoDireccionBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.departamento_block_beneficiario,
    [Validators.required]
  );
  casaBeneficiario = new FormControl(
    this.data.datoBeneficiarioPar.casa_beneficiario,
    [Validators.required]
  );

  modificaBeneficiario = signal<FormGroup>(
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
        ? 'Debes ingresar Rut Beneficiario'
        : this.rutBeneficiario.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'nombreBeneficiario') {
      return this.nombreBeneficiario.hasError('required')
        ? 'Debes ingresar Nombre'
        : '';
    }

    if (campo === 'correoBeneficiario') {
      return this.correoBeneficiario.hasError('required')
        ? 'Debes ingresar Correo'
        : '';
    }

    if (campo === 'telefonoBeneficiario') {
      return this.telefonoBeneficiario.hasError('required')
        ? 'Debes ingresar Teléfono'
        : '';
    }

    if (campo === 'regionBeneficiario') {
      return this.regionBeneficiario.hasError('required')
        ? 'Debes ingresar Región'
        : '';
    }

    if (campo === 'ciudadBeneficiario') {
      return this.ciudadBeneficiario.hasError('required')
        ? 'Debes ingresar Dirección'
        : '';
    }
    if (campo === 'comunaBeneficiario') {
      return this.comunaBeneficiario.hasError('required')
        ? 'Debes ingresar Comuna'
        : '';
    }

    if (campo === 'direccionBeneficiario') {
      return this.direccionBeneficiario.hasError('required')
        ? 'Debes ingresar Dirección'
        : '';
    }

    if (campo === 'numeroDireccionBeneficiario') {
      return this.numeroDireccionBeneficiario.hasError('required')
        ? 'Debes ingresar Dirección'
        : '';
    }

    if (campo === 'deptoDireccionBeneficiario') {
      return this.deptoDireccionBeneficiario.hasError('required')
        ? 'Debes ingresar Dirección'
        : '';
    }

    if (campo === 'casaBeneficiario') {
      return this.casaBeneficiario.hasError('required')
        ? 'Debes ingresar Dirección'
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
      await this.modificaBeneficiario()
        .get('rutBeneficiario')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  modificar() {
    this.beneficiario = {
      p_id_solicitud: Number(this.data.idSolicitud),
      p_rut_beneficiario:
        this.modificaBeneficiario().get('rutBeneficiario')!.value,
      p_nombre_razon_social_beneficiario:
        this.modificaBeneficiario().get('nombreBeneficiario')!.value,
      p_mail_beneficiario:
        this.modificaBeneficiario().get('correoBeneficiario')!.value,
      p_telefono_beneficiario: this.modificaBeneficiario().get(
        'telefonoBeneficiario'
      )!.value,
      p_region_beneficiario:
        this.modificaBeneficiario().get('regionBeneficiario')!.value,
      p_ciudad_beneficiario:
        this.modificaBeneficiario().get('ciudadBeneficiario')!.value,
      p_comuna_beneficiario:
        this.modificaBeneficiario().get('comunaBeneficiario')!.value,
      p_direccion_beneficiario: this.modificaBeneficiario().get(
        'direccionBeneficiario'
      )!.value,
      p_numero_dir_beneficiario: this.modificaBeneficiario().get(
        'numeroDireccionBeneficiario'
      )!.value,
      p_departamento_block_beneficiario: this.modificaBeneficiario().get(
        'deptoDireccionBeneficiario'
      )!.value,
      p_casa_beneficiario:
        this.modificaBeneficiario().get('casaBeneficiario')!.value,
      p_usuario_modificacion: this._storage()?.usuarioLogin.usuario,
    };
    console.log('Beneficiario Modificado:', this.beneficiario);
    this.beneficiarioService
      .postModificaBeneficiario(this.beneficiario)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            //alert('Modificó Beneficiario Bien');
            this.dialogRef.close('modificado');
          } else {
            if (dato.codigo != 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
              alert('Error:' + dato.mensaje);
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }
}
