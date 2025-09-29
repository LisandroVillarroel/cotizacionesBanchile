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
  IAsegurado,
  IAseguradoLista,
} from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';

@Component({
  selector: 'app-elimina-solicitud-asegurado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './elimina-solicitud-asegurado.component.html',
  styleUrl: './elimina-solicitud-asegurado.component.css',
})
export class EliminaSolicitudAseguradoComponent {
  asegurado!: IAsegurado;

  aseguradoService = inject(AseguradoService);

  private readonly dialogRef = inject(
    MatDialogRef<EliminaSolicitudAseguradoComponent>
  );
  public readonly data = inject<IAseguradoLista>(MAT_DIALOG_DATA);

  rutAsegurado = new FormControl(this.data.rutAsegurado, [
    Validators.required,
    this.validaRut,
  ]);
  nombreAsegurado = new FormControl('nombreAsegurado', [Validators.required]);
  correoAsegurado = new FormControl('correoAsegurado', [Validators.required]);
  telefonoAsegurado = new FormControl('telefonoAsegurado', [
    Validators.required,
  ]);
  regionAsegurado = new FormControl('regionAsegurado', [Validators.required]);
  ciudadAsegurado = new FormControl('ciudadAsegurado', [Validators.required]);
  comunaAsegurado = new FormControl('comunaAsegurado', [Validators.required]);
  direccionAsegurado = new FormControl('direccionAsegurado', [
    Validators.required,
  ]);
  numeroDireccionAsegurado = new FormControl('numeroDireccionAsegurado', [
    Validators.required,
  ]);
  deptoDireccionAsegurado = new FormControl('deptoDireccionAsegurado', [
    Validators.required,
  ]);
  casaAsegurado = new FormControl('casaAsegurado', [Validators.required]);

  eliminaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.rutAsegurado,
      nombreAsegurado: this.nombreAsegurado,
      correoAsegurado: this.correoAsegurado,
      telefonoAsegurado: this.telefonoAsegurado,
      regionAsegurado: this.regionAsegurado,
      ciudadAsegurado: this.ciudadAsegurado,
      comunaAsegurado: this.comunaAsegurado,
      direccionAsegurado: this.direccionAsegurado,
      numeroDireccionAsegurado: this.numeroDireccionAsegurado,
      deptoDireccionAsegurado: this.deptoDireccionAsegurado,
      casaAsegurado: this.casaAsegurado,
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

  async onBlurRutAsegurado(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.eliminaAsegurado()
        .get('rutAsegurado')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  eliminar() {
    this.asegurado = {
      p_id_solicitud: 5,
      p_rut_asegurado: this.eliminaAsegurado().get('rutAsegurado')!.value,
      p_nombre_razon_social_asegurado:
        this.eliminaAsegurado().get('nombreAsegurado')!.value,
      p_mail_asegurado: this.eliminaAsegurado().get('correoAsegurado')!.value,
      p_telefono_asegurado:
        this.eliminaAsegurado().get('telefonoAsegurado')!.value,
      p_region_asegurado: this.eliminaAsegurado().get('regionAsegurado')!.value,
      p_ciudad_asegurado: this.eliminaAsegurado().get('ciudadAsegurado')!.value,
      p_comuna_asegurado: this.eliminaAsegurado().get('comunaAsegurado')!.value,
      p_direccion_asegurado:
        this.eliminaAsegurado().get('direccionAsegurado')!.value,
      p_numero_dir_asegurado: this.eliminaAsegurado().get(
        'numeroDireccionAsegurado'
      )!.value,
      p_departamento_block_asegurado: this.eliminaAsegurado().get(
        'deptoDireccionAsegurado'
      )!.value,
      p_casa_asegurado: this.eliminaAsegurado().get('casaAsegurado')!.value,
      p_usuario_creacion: 'EJE022',
    };

    console.log('Asegurado Eliminado:', this.asegurado);
    this.aseguradoService.postEliminaAsegurado(this.asegurado).subscribe({
      next: (dato) => {
        console.log('dato:', dato);
        if (dato.codigo === 200) {
          alert('Eliminó Asegurado Bien');
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
