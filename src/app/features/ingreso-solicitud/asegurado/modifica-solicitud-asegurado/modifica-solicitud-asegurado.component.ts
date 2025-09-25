import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { IAsegurado, IAseguradoLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';


@Component({
  selector: 'app-modifica-solicitud-asegurado',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './modifica-solicitud-asegurado.component.html',
  styleUrl: './modifica-solicitud-asegurado.component.css'
})
export class ModificaSolicitudAseguradoComponent {
  asegurado!: IAsegurado;

  aseguradoService = inject(AseguradoService)

  private readonly dialogRef = inject(
    MatDialogRef<ModificaSolicitudAseguradoComponent>
  );


  readonly data = inject<IAseguradoLista>(MAT_DIALOG_DATA);

  rutAsegurado = new FormControl(this.data.rutAsegurado, [Validators.required, this.validaRut]);
  nombreAsegurado = new FormControl('', [Validators.required]);
  regionAsegurado = new FormControl('', [Validators.required]);
  ciudadAsegurado = new FormControl('', [Validators.required]);
  comunaAsegurado = new FormControl('', [Validators.required]);
  direccionAsegurado = new FormControl('', [Validators.required]);
  numeroDireccionAsegurado = new FormControl('', [Validators.required]);
  deptoDireccionAsegurado = new FormControl('', [Validators.required]);
  casaAsegurado = new FormControl('', [Validators.required]);
  telefonoAsegurado = new FormControl('', [Validators.required]);
  correoAsegurado = new FormControl('', [Validators.required]);

  modificaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
      regionAsegurado: this.regionAsegurado,
      ciudadAsegurado: this.ciudadAsegurado,
      comunaAsegurado: this.comunaAsegurado,
      direccionAsegurado: this.direccionAsegurado,
      numeroDireccionAsegurado: this.numeroDireccionAsegurado,
      deptoDireccionAsegurado: this.deptoDireccionAsegurado,
      casaAsegurado: this.casaAsegurado,
      telefonoAsegurado: this.telefonoAsegurado,
      correoAsegurado: this.correoAsegurado,
    })
  );


  getErrorMessage(campo: string) {
    if (campo === 'rutAsegurado') {
      return this.p_rut_asegurado.hasError('required')
        ? 'Debes ingresar Rut Asegurado'
        : this.rutAsegurado.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }
    if (campo === 'nombreAsegurado') {
      return this.p_nombre_razon_social_asegurado.hasError('required')
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

    if (campo === 'telefonoAsegurado') {
      return this.p_telefono_asegurado.hasError('required')
        ? 'Debes ingresar Teléfono'
        : '';
    }

    if (campo === 'correoAsegurado') {
      return this.p_mail_asegurado.hasError('required')
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
    this.asegurado = {
      p_id_ejecutivo_banco: 'EJ001',
      p_id_solicitud: '5',
      p_rut_asegurado: this.modificaAsegurado().get('rutAsegurado')!.value,
      p_nombre_razon_social_asegurado: this.modificaAsegurado().get('nombreAsegurado')!.value,
      p_mail_asegurado: this.modificaAsegurado().get('correoAsegurado')!.value,
      p_telefono_asegurado: this.modificaAsegurado().get('telefonoAsegurado')!.value,
      p_region_asegurado: this.modificaAsegurado().get('regionAsegurado')!.value,
      p_ciudad_asegurado: this.modificaAsegurado().get('ciudadAsegurado')!.value,
      p_comuna_asegurado: this.modificaAsegurado().get('comunaAsegurado')!.value,
      p_direccion_asegurado: this.modificaAsegurado().get('direccionAsegurado')!.value,
      p_numero_dir_asegurado: this.modificaAsegurado().get('numeroDireccionAsegurado')!.value,
      p_departamento_block_asegurado: this.modificaAsegurado().get('deptoDireccionAsegurado')!.value,
      p_casa_asegurado: this.modificaAsegurado().get('casaAsegurado')!.value
    };


    console.log('Asegurado modificao:', this.asegurado);
    this.aseguradoService
      .postModificaAsegurado(this.asegurado)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Modificó asegurado bien')

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
