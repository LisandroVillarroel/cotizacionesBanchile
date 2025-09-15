import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agrega-solicitud-beneficiario',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './agrega-solicitud-beneficiario.component.html',
  styleUrl: './agrega-solicitud-beneficiario.component.css'
})
export class AgregaSolicitudBeneficiarioComponent {

  private readonly dialogRef = inject(MatDialogRef<AgregaSolicitudBeneficiarioComponent>);

  rutBeneficiario = new FormControl('', [Validators.required, this.validaRut]);
  nombreBeneficiario = new FormControl('', [Validators.required]);
  apellidoPaternoBeneficiario = new FormControl('', [Validators.required]);
  apellidoMaternoBeneficiario = new FormControl('', [Validators.required]);
  regionBeneficiario = new FormControl('', [Validators.required]);
  ciudadBeneficiario = new FormControl('', [Validators.required]);
  comunaBeneficiario = new FormControl('', [Validators.required]);
  direccionBeneficiario = new FormControl('', [Validators.required]);
  telefonoBeneficiario = new FormControl('', [Validators.required]);
  correoBeneficiario = new FormControl('', [Validators.required]);

  agregaBeneficiario = signal<FormGroup>(
    new FormGroup({
      rutBeneficiario: this.rutBeneficiario,
      nombreBeneficiario: this.nombreBeneficiario,
      apellidoPaternoBeneficiario: this.apellidoPaternoBeneficiario,
      apellidoMaternoBeneficiario: this.apellidoMaternoBeneficiario,
      regionBeneficiario: this.regionBeneficiario,
      ciudadBeneficiario: this.ciudadBeneficiario,
      comunaBeneficiario: this.comunaBeneficiario,
      direccionBeneficiario: this.direccionBeneficiario,
      telefonoBeneficiario: this.telefonoBeneficiario,
      correoBeneficiario: this.correoBeneficiario
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

    if (campo === 'apellidoPaternoBeneficiario') {
      return this.apellidoPaternoBeneficiario.hasError('required')
        ? 'Debes ingresar Apellido Paterno'
        : '';
    }

    if (campo === 'apellidoMaternoBeneficiario') {
      return this.apellidoMaternoBeneficiario.hasError('required')
        ? 'Debes ingresar Apellido Materno'
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

    if (campo === 'telefonoBeneficiario') {
      return this.telefonoBeneficiario.hasError('required')
        ? 'Debes ingresar Teléfono'
        : '';
    }

    if (campo === 'correoBeneficiario') {
      return this.correoBeneficiario.hasError('required')
        ? 'Debes ingresar Correo'
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
        .setValue(formatRut(rut, RutFormat.DOTS_DASH))
    }
  }

  grabar() {
    this.dialogRef.close(1);
  }
}
