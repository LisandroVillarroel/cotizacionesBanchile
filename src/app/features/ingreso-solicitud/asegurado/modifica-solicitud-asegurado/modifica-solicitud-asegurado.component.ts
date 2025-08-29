import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { ISolicitudAsegurado } from '@features/ingreso-solicitud/modelo/ingreso-solicitud';


@Component({
  selector: 'app-modifica-solicitud-asegurado',
  standalone: true,
  imports: [ MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './modifica-solicitud-asegurado.component.html',
  styleUrl: './modifica-solicitud-asegurado.component.css'
})
export class ModificaSolicitudAseguradoComponent {

  readonly dialogRef = inject(MatDialogRef<ModificaSolicitudAseguradoComponent>);
  readonly data = inject<ISolicitudAsegurado>(MAT_DIALOG_DATA);

  rutAsegurado = new FormControl(this.data.rutAsegurado, [Validators.required, this.validaRut]);
  nombreAsegurado = new FormControl(this.data.nombreAsegurado, [Validators.required]);
  apellidoPaternoAsegurado = new FormControl(this.data.apellidoPaternoAsegurado, [Validators.required]);
  apellidoMaternoAsegurado = new FormControl(this.data.apellidoMaternoAsegurado, [Validators.required]);
  regionAsegurado = new FormControl(this.data.regionAsegurado, [Validators.required]);
  ciudadAsegurado = new FormControl(this.data.ciudadAsegurado, [Validators.required]);
  comunaAsegurado = new FormControl(this.data.comunaAsegurado, [Validators.required]);
  direccionAsegurado = new FormControl(this.data.direccionAsegurado, [Validators.required]);
  telefonoAsegurado = new FormControl(this.data.telefonoAsegurado, [Validators.required]);
  correoAsegurado = new FormControl(this.data.correoAsegurado, [Validators.required]);

   modificaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
      apellidoPaternoAsegurado: this.apellidoPaternoAsegurado,
      apellidoMaternoAsegurado: this.apellidoMaternoAsegurado,
      regionAsegurado: this.regionAsegurado,
      ciudadAsegurado: this.ciudadAsegurado,
      comunaAsegurado: this.comunaAsegurado,
      direccionAsegurado: this.direccionAsegurado,
      telefonoAsegurado: this.telefonoAsegurado,
      correoAsegurado: this.correoAsegurado
    })
  );


  getErrorMessage(campo: string) {
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

    if (campo === 'apellidoPaternoAsegurado') {
      return this.apellidoPaternoAsegurado.hasError('required')
        ? 'Debes ingresar Apellido Paterno'
        : '';
    }

    if (campo === 'apellidoMaternoAsegurado') {
      return this.apellidoMaternoAsegurado.hasError('required')
        ? 'Debes ingresar Apellido Materno'
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

    if (campo === 'telefonoAsegurado') {
      return this.telefonoAsegurado.hasError('required')
        ? 'Debes ingresar Teléfono'
        : '';
    }

    if (campo === 'correoAsegurado') {
      return this.correoAsegurado.hasError('required')
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

  async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.modificaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH))
    }
  }

  modificar() {
     this.dialogRef.close(1);
  }
}
