import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { ISolicitudAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';


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

  rutAsegurado = new FormControl(this.data.p_rut_asegurado, [Validators.required, this.validaRut]);
  nombreAsegurado = new FormControl(this.data.p_nombre_razon_social_asegurado, [Validators.required]);
  regionAsegurado = new FormControl(this.data.p_region_asegurado, [Validators.required]);
  ciudadAsegurado = new FormControl(this.data.p_ciudad_asegurado, [Validators.required]);
  comunaAsegurado = new FormControl(this.data.p_comuna_asegurado, [Validators.required]);
  direccionAsegurado = new FormControl(this.data.p_direccion_asegurado, [Validators.required]);
  telefonoAsegurado = new FormControl(this.data.p_telefono_asegurado, [Validators.required]);
  correoAsegurado = new FormControl(this.data.p_mail_asegurado, [Validators.required]);

   modificaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
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
     this.dialogRef.close(this.modificaAsegurado().value);
  }
}
