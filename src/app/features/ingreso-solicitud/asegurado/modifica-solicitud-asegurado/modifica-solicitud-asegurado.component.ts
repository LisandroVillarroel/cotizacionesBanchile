import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { IModificaAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
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
  asegurado!: IModificaAsegurado;

  aseguradoService = inject(AseguradoService)

  private readonly dialogRef = inject(
    MatDialogRef<ModificaSolicitudAseguradoComponent>
  );


  /* readonly dialogRef = inject(MatDialogRef<ModificaSolicitudAseguradoComponent>);
  readonly data = inject<ISolicitudAsegurado>(MAT_DIALOG_DATA); */

  p_rut_asegurado = new FormControl('', [Validators.required, this.validaRut]);
  p_nombre_razon_social_asegurado = new FormControl('', [Validators.required]);
  //apellidoPaternoAsegurado = new FormControl('', [Validators.required]);
  //apellidoMaternoAsegurado = new FormControl('', [Validators.required]);
  //regionAsegurado = new FormControl('', [Validators.required]);
  //ciudadAsegurado = new FormControl('', [Validators.required]);
  //comunaAsegurado = new FormControl('', [Validators.required]);
  //direccionAsegurado = new FormControl('', [Validators.required]);
  p_telefono_asegurado = new FormControl('', [Validators.required]);
  p_mail_asegurado = new FormControl('', [Validators.required]);

  modificaAsegurado = signal<FormGroup>(
    new FormGroup({
      rutAsegurado: this.p_rut_asegurado,
      nombreAsegurado: this.p_nombre_razon_social_asegurado,
      //regionAsegurado: this.regionAsegurado,
      //ciudadAsegurado: this.ciudadAsegurado,
      //comunaAsegurado: this.comunaAsegurado,
      //direccionAsegurado: this.direccionAsegurado,
      telefonoAsegurado: this.p_telefono_asegurado,
      correoAsegurado: this.p_mail_asegurado
    })
  );


  getErrorMessage(campo: string) {
    if (campo === 'rutAsegurado') {
      return this.p_rut_asegurado.hasError('required')
        ? 'Debes ingresar Rut Asegurado'
        : this.p_rut_asegurado.hasError('rutInvalido')
          ? 'Rut Inválido'
          : '';
    }
    if (campo === 'nombreAsegurado') {
      return this.p_nombre_razon_social_asegurado.hasError('required')
        ? 'Debes ingresar Nombre'
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
      p_id_solicitud: '8881606',
      p_rut_asegurado: this.modificaAsegurado().get('p_rut_asegurado')!.value,
      p_nombre_razon_social_asegurado: this.modificaAsegurado().get('p_nombre_razon_social_asegurado')!.value,
      p_mail_asegurado: this.modificaAsegurado().get('p_mail_asegurado')!.value,
      p_telefono_asegurado: this.modificaAsegurado().get('p_telefono_asegurado')!.value,
      p_region_asegurado: 'RM',
      p_ciudad_asegurado: 'Santiago',
      p_comuna_asegurado: 'Providencia',
      p_direccion_asegurado: 'Av. Siempre Viva',
      p_numero_dir_asegurado: '123',
      p_departamento_block_asegurado: '501',
      p_casa_asegurado: '1',
    };

    console.log('Asegurado modificao:', this.asegurado);
    this.aseguradoService
      .postAgregaAsegurado(this.asegurado)
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
