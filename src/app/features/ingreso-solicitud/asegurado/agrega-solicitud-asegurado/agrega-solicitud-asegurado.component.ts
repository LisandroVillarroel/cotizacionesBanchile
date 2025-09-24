import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { IIngresoAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';

@Component({
  selector: 'app-agrega-solicitud-asegurado',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './agrega-solicitud-asegurado.component.html',
  styleUrl: './agrega-solicitud-asegurado.component.css',
})
export class AgregaSolicitudAseguradoComponent {
  asegurado!: IIngresoAsegurado;

  aseguradoService=inject(AseguradoService)

  private readonly dialogRef = inject(
    MatDialogRef<AgregaSolicitudAseguradoComponent>
  );

  rutAsegurado = new FormControl('', [Validators.required, this.validaRut]);
  nombreAsegurado = new FormControl('', [Validators.required]);
  apellidoPaternoAsegurado = new FormControl('', [Validators.required]);
  apellidoMaternoAsegurado = new FormControl('', [Validators.required]);
  //regionAsegurado = new FormControl('', [Validators.required]);
  //ciudadAsegurado = new FormControl('', [Validators.required]);
  //comunaAsegurado = new FormControl('', [Validators.required]);
  //direccionAsegurado = new FormControl('', [Validators.required]);
  telefonoAsegurado = new FormControl('', [Validators.required]);
  correoAsegurado = new FormControl('', [Validators.required]);

  agregaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
      apellidoPaternoAsegurado: this.apellidoPaternoAsegurado,
      apellidoMaternoAsegurado: this.apellidoMaternoAsegurado,
      //regionAsegurado: this.regionAsegurado,
      //ciudadAsegurado: this.ciudadAsegurado,
      //comunaAsegurado: this.comunaAsegurado,
      //direccionAsegurado: this.direccionAsegurado,
      telefonoAsegurado: this.telefonoAsegurado,
      correoAsegurado: this.correoAsegurado,
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

    /* if (campo === 'regionAsegurado') {
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
  } */

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
      await this.agregaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  grabar() {
    this.asegurado =  {
      rut_asegurado: this.agregaAsegurado().get('rut_asegurado')!.value,
      nombre_razon_social_asegurado: this.agregaAsegurado().get('nombre_razon_social_asegurado')!.value,
      mail_asegurado: this.agregaAsegurado().get('mail_asegurado')!.value,
      telefono_asegurado: this.agregaAsegurado().get('telefono_asegurado:')!.value,
      region_asegurado: '',
      ciudad_asegurado: '',
      comuna_asegurado: '',
      direccion_asegurado: '',
      numero_dir_asegurado: '',
      departamento_block_asegurado: '',
      casa_asegurado: '',
    };

    console.log('Asegurado grabado:', this.asegurado);
    this.aseguradoService
    .postAgregaAsegurado(this.asegurado)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Grabó bien')

          } else {
            if (dato.codigo != 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
              alert('Error:' + dato.mensaje);
              console.log('ERROR DE SISTEMA:');
            }
          }
        },
        error: (error) => {
          console.log('ERROR INESPERADO', error);
        },
      });
    this.dialogRef.close();
  }
}
