import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { ICompaniaSeguro } from '../compania-Interface';
import {
  validateRut,
  cleanRut,
  formatRut,
  RutFormat,
} from '@fdograph/rut-utilities';

@Component({
  selector: 'app-modifica-compania',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './modifica-compania.component.html',
  styleUrls: ['./modifica-compania.component.css'],
})
export class ModificaCompaniaComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<ModificaCompaniaComponent>);
  readonly data = inject<ICompaniaSeguro>(MAT_DIALOG_DATA);

  rutCompania = new FormControl(this.data.p_rut_compania_seguro, [
    Validators.required,
    this.validaRut,
  ]);
  nombreCompania = new FormControl(this.data.p_nombre_compania_seguro, [
    Validators.required,
  ]);
  direccionCompania = new FormControl(this.data.p_direccion_compania_seguro, [
    Validators.required,
  ]);
  telefonoCompania = new FormControl(this.data.p_telefono_compania_seguro, [
    Validators.required,
  ]);
  estadoCompania = new FormControl(this.data.p_estado_compania_seguro, [
    Validators.required,
  ]);
  correoCompania = new FormControl(this.data.p_correo_compania_seguro, [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);

  modificaCompania = signal<FormGroup>(
    new FormGroup({
      rutCompania: this.rutCompania,
      nombreCompania: this.nombreCompania,
      direccionCompania: this.direccionCompania,
      telefonoCompania: this.telefonoCompania,
      estadoCompania: this.estadoCompania,
      correoCompania: this.correoCompania,
    })
  );

  validaRut(control: FormControl): { [s: string]: boolean } | null {
    if (!validateRut(control.value)) {
      return { rutInvalido: true };
    }
    return null;
  }

  getErrorMessage(campo: string) {
    if (campo === 'rutCompania') {
      return this.rutCompania.hasError('required')
        ? 'Debes ingresar Rut Compañía'
        : this.rutCompania.hasError('rutInvalido')
        ? 'Rut Inválido'
        : '';
    }

    if (campo === 'nombreCompania') {
      return this.nombreCompania.hasError('required')
        ? 'Debes ingresar Nombre Compañía'
        : '';
    }

    if (campo === 'correoCompania') {
      if (this.correoCompania.hasError('required')) {
        return 'Debes ingresar Correo';
      }
      if (this.correoCompania.hasError('pattern')) {
        return 'Debes ingresar un correo válido';
      }
    }

    if (campo === 'telefonoCompania') {
      if (this.telefonoCompania.hasError('required')) {
        return 'Debes ingresar Teléfono';
      }
      if (this.telefonoCompania.hasError('pattern')) {
        return 'Formato de teléfono inválido. Usa 9XXXXXXXX o 22XXXXXXX';
      }
    }

    if (campo === 'direccionCompania') {
      return this.direccionCompania.hasError('required')
        ? 'Debes ingresar Dirección'
        : '';
    }

    if (campo === 'estadoCompania') {
      return this.estadoCompania.hasError('required')
        ? 'Debes seleccionar Estado'
        : '';
    }

    return '';
  }

  async onBlurRutCompania(event: any) {
    const rutIngresado = this.modificaCompania().get('rutCompania')!.value;

    if (!rutIngresado) {
      return;
    }

    if (this.rutCompania.invalid) {
      this.notificacioAlertnService.error('ERROR', 'RUT inválido');
      return;
    }

    await this.modificaCompania()
      .get('rutCompania')!
      .setValue(formatRut(cleanRut(rutIngresado), RutFormat.DOTS_DASH), {
        emitEvent: false,
      });
  }

  modificar() {
    const rutVisual = this.modificaCompania().get('rutCompania')!.value;
    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    const payload = {
      p_id_usuario: 'ADM042', // parametrizable
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.p_id_compania_seguro,
      p_rut_compania_seguro: rutParaBD,
      p_nombre_compania_seguro:
        this.modificaCompania().get('nombreCompania')!.value,
      p_direccion_compania_seguro:
        this.modificaCompania().get('direccionCompania')!.value,
      p_telefono_compania_seguro:
        this.modificaCompania().get('telefonoCompania')!.value,
      p_estado_compania_seguro:
        this.modificaCompania().get('estadoCompania')!.value,
      p_correo_compania_seguro:
        this.modificaCompania().get('correoCompania')!.value,
    };

    this.companiaService.postModificarCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success(
            'Éxito',
            'Compañía modificada correctamente'
          );
          this.dialogRef.close('modificado');
        } else {
          this.notificacioAlertnService.error('ERROR', resp.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }
}
