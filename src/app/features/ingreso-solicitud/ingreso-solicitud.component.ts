import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatDialogModule } from '@angular/material/dialog';
import { ISolicitud } from './modelo/ingreso-solicitud';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-ingreso-solicitud',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
  MatDialogModule,
  MatButtonModule,
  ReactiveFormsModule],
  templateUrl: './ingreso-solicitud.component.html',
  styleUrl: './ingreso-solicitud.component.css'
})
export default class IngresoSolicitudComponent {

  datoSolicitud: ISolicitud | undefined;

  rut = new FormControl('', [Validators.required, this.validaRut]);
  apellidoPaterno = new FormControl('', [Validators.required]);
  apellidoMaterno = new FormControl('', [Validators.required]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
  ]);

  agregaSolicitud = signal<FormGroup>(
    new FormGroup({
      rutCliente: this.rut,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      email: this.email
    })
  );

getErrorMessage(campo: string) {
    if (campo === 'rut') {
      return this.rut.hasError('required')
        ? 'Debes ingresar Rut'
        : this.rut.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'apellidoPaterno') {
      return this.apellidoPaterno.hasError('required')
        ? 'Debes ingresar Apellido Paterno'
        : '';
    }
    if (campo === 'Mpellido Materno') {
      return this.apellidoMaterno.hasError('required')
        ? 'Debes ingresar Apellido Materno'
        : '';
    }
    if (campo === 'email') {
      return this.email.hasError('required') ? 'Debes ingresar Email' : '';
    }


    return '';
  }

  enviar() {

    this.datoSolicitud = {
      rut: this.agregaSolicitud().get('rut')!.value.toUpperCase(),
      apellidoPaterno: this.agregaSolicitud().get('apellidoPaterno')!.value,
      apellidoMaterno: this.agregaSolicitud().get('apellidoMaterno')!.value,
      email: this.agregaSolicitud().get('email')!.value,
    };
  }

  async onBlurRut(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaSolicitud()
        .get('rutCliente')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));

    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }
}
