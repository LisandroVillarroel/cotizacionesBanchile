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
  IBeneficiario,
  IBeneficiarioLista,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '@features/ingreso-solicitud/service/beneficiario.service';

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
  beneficiario!: IBeneficiario;

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialogRef = inject(
    MatDialogRef<ModificaSolicitudBeneficiarioComponent>
  );

  readonly data = inject<IBeneficiarioLista>(MAT_DIALOG_DATA);

  rutBeneficiario = new FormControl(this.data.rut_beneficiario, [
    Validators.required,
    this.validaRut,
  ]);
  nombreBeneficiario = new FormControl(
    this.data.nombre_razon_social_beneficiario,
    [Validators.required]
  );

  correoBeneficiario = new FormControl(this.data.mail_beneficiario, [
    Validators.required,
  ]);

  telefonoBeneficiario = new FormControl(this.data.telefono_beneficiario, [
    Validators.required,
  ]);

  regionBeneficiario = new FormControl(this.data.region_beneficiario, [
    Validators.required,
  ]);
  ciudadBeneficiario = new FormControl(this.data.ciudad_beneficiario, [
    Validators.required,
  ]);
  comunaBeneficiario = new FormControl(this.data.comuna_beneficiario, [
    Validators.required,
  ]);
  direccionBeneficiario = new FormControl(this.data.direccion_beneficiario, [
    Validators.required,
  ]);

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
      p_id_ejecutivo_banco: 'EJ001',
      p_id_solicitud: '5',
      p_rut_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_nombre_razon_social_beneficiario:
        this.modificaBeneficiario().get('')!.value,
      p_mail_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_telefono_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_region_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_ciudad_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_comuna_beneficiario: this.modificaBeneficiario().get('')!.value,
      p_direccion_beneficiario: this.modificaBeneficiario().get('')!.value,
    };
    console.log('Beneficiario Modificado:', this.beneficiario);
    this.beneficiarioService
      .postModificaAsegurado(this.beneficiario)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Modificó beneficiario bien');
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
