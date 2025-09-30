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
  IBeneficiario,
  IBeneficiarioLista,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '@features/ingreso-solicitud/service/beneficiario.service';

@Component({
  selector: 'app-elimina-solicitud-beneficiario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './elimina-solicitud-beneficiario.component.html',
  styleUrl: './elimina-solicitud-beneficiario.component.css',
})
export class EliminaSolicitudBeneficiarioComponent {
  beneficiario!: IBeneficiario;

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<EliminaSolicitudBeneficiarioComponent>
  );
  public readonly data = inject<IBeneficiarioLista>(MAT_DIALOG_DATA);

  rutBeneficiario = new FormControl(this.data.rut_beneficiario, [
    Validators.required,
    this.validaRut,
  ]);
  nombreBeneficiario = new FormControl('nombreBeneficiario', [
    Validators.required,
  ]);
  correoBeneficiario = new FormControl('correoBeneficiario', [
    Validators.required,
  ]);
  telefonoBeneficiario = new FormControl('telefonoBeneficiario', [
    Validators.required,
  ]);
  regionBeneficiario = new FormControl('regionBeneficiario', [
    Validators.required,
  ]);
  ciudadBeneficiario = new FormControl('ciudadBeneficiario', [
    Validators.required,
  ]);
  comunaBeneficiario = new FormControl('comunaBeneficiario', [
    Validators.required,
  ]);
  direccionBeneficiario = new FormControl('direccionBeneficiario', [
    Validators.required,
  ]);
  numeroDireccionBeneficiario = new FormControl('numeroDireccionBeneficiario', [
    Validators.required,
  ]);
  deptoDireccionBeneficiario = new FormControl('deptoDireccionBeneficiario', [
    Validators.required,
  ]);
  casaBeneficiario = new FormControl('casaBeneficiario', [Validators.required]);

  eliminaBeneficiario = signal<FormGroup>(
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

  /* getErrorMessage(campo: string) {
      if (campo === 'rutAsegurado') {
        return this.rutAsegurado.hasError('required')
          ? 'Debes ingresar Rut Asegurado'
          : this.rutAsegurado.hasError('rutInvalido')
          ? 'Rut Inválido'
          : '';
      }
      if (campo === 'nombreAsegurado') {
        return this.nombreAsegurado.hasError('required')
          ? 'Debes ingresar Nombre'
          : '';
      }

      if (campo === 'correoAsegurado') {
        return this.telefonoAsegurado.hasError('required')
          ? 'Debes ingresar Correo'
          : '';
      }

      if (campo === 'telefonoAsegurado') {
        return this.telefonoAsegurado.hasError('required')
          ? 'Debes ingresar Teléfono'
          : '';
      }

      if (campo === 'regionAsegurado') {
        return this.regionAsegurado.hasError('required')
          ? 'Debes ingresar Región'
          : '';
      }

      if (campo === 'ciudadAsegurado') {
        return this.ciudadAsegurado.hasError('required')
          ? 'Debes ingresar Dirección'
          : '';
      }
      if (campo === 'comunaAsegurado') {
        return this.comunaAsegurado.hasError('required')
          ? 'Debes ingresar Comuna'
          : '';
      }

      if (campo === 'direccionAsegurado') {
        return this.direccionAsegurado.hasError('required')
          ? 'Debes ingresar Dirección'
          : '';
      }

      if (campo === 'numeroDireccionAsegurado') {
        return this.numeroDireccionAsegurado.hasError('required')
          ? 'Debes ingresar Número Dirección'
          : '';
      }

      if (campo === 'deptoDireccionAsegurado') {
        return this.deptoDireccionAsegurado.hasError('required')
          ? 'Debes ingresar Departamento Dirección'
          : '';
      }

      if (campo === 'casaAsegurado') {
        return this.casaAsegurado.hasError('required')
          ? 'Debes ingresar Número casa Dirección'
          : '';
      }

      return '';
    } */

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  async onBlurRutBeneficiario(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.eliminaBeneficiario()
        .get('rutBeneficiario')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  eliminar() {
    this.beneficiario = {
      p_id_solicitud: 5,
      p_rut_beneficiario:
        this.eliminaBeneficiario().get('rutBeneficiario')!.value,
      p_nombre_razon_social_beneficiario:
        this.eliminaBeneficiario().get('nombreBeneficiario')!.value,
      p_mail_beneficiario:
        this.eliminaBeneficiario().get('correoBeneficiario')!.value,
      p_telefono_beneficiario:
        this.eliminaBeneficiario().get('telefonoBeneficiario')!.value,
      p_region_beneficiario:
        this.eliminaBeneficiario().get('regionBeneficiario')!.value,
      p_ciudad_beneficiario:
        this.eliminaBeneficiario().get('ciudadBeneficiario')!.value,
      p_comuna_beneficiario:
        this.eliminaBeneficiario().get('comunaBeneficiario')!.value,
      p_direccion_beneficiario:
        this.eliminaBeneficiario().get('direccionBeneficiario')!.value,
      p_numero_dir_beneficiario: this.eliminaBeneficiario().get(
        'numeroDireccionBeneficiario'
      )!.value,
      p_departamento_block_beneficiario: this.eliminaBeneficiario().get(
        'deptoDireccionBeneficiario'
      )!.value,
      p_casa_beneficiario:
        this.eliminaBeneficiario().get('casaBeneficiario')!.value,
      p_usuario_creacion: 'EJE022',
    };

    console.log('Beneficiario Eliminado:', this.beneficiario);
    this.beneficiarioService
      .postEliminaBeneficiario(this.beneficiario)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Eliminó Beneficiario Bien');
            this.dialogRef.close('eliminado');
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
