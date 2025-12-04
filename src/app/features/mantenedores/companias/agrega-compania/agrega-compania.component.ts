import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import {
  validateRut,
  cleanRut,
  formatRut,
  RutFormat,
} from '@fdograph/rut-utilities';

@Component({
  selector: 'app-agrega-compania',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    CabeceraPopupComponente,
  ],
  templateUrl: './agrega-compania.component.html',
  styleUrls: ['./agrega-compania.component.css'],
})
export class AgregaCompaniaComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<AgregaCompaniaComponent>);

  rutCompania = new FormControl('', [Validators.required, this.validaRut]);
  nombreCompania = new FormControl('', [Validators.required]);
  direccionCompania = new FormControl('', [Validators.required]);
  telefonoCompania = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(9\d{8}|\+56\d{9})$/),
  ]);
  correoCompania = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);

  agregaCompania = signal<FormGroup>(
    new FormGroup({
      rutCompania: this.rutCompania,
      nombreCompania: this.nombreCompania,
      direccionCompania: this.direccionCompania,
      telefonoCompania: this.telefonoCompania,
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

    return '';
  }

  async onBlurRutCompania(event: any) {
    const rutIngresado = this.agregaCompania().get('rutCompania')!.value;

    if (!rutIngresado) {
      return;
    }

    if (this.rutCompania.invalid) {
      this.notificacioAlertnService.error('ERROR', 'RUT inválido');
      return;
    }

    await this.agregaCompania()
      .get('rutCompania')!
      .setValue(formatRut(cleanRut(rutIngresado), RutFormat.DOTS_DASH), {
        emitEvent: false,
      });
  }

  grabar() {
    const rutVisual = this.agregaCompania().get('rutCompania')!.value;
    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    const payload = {
      p_id_usuario: 'adm001', // temporal
      p_tipo_usuario: 'A',
      p_rut_compania_seguro: rutParaBD,
      p_nombre_compania_seguro:
        this.agregaCompania().get('nombreCompania')!.value,
      p_direccion_compania_seguro:
        this.agregaCompania().get('direccionCompania')!.value,
      p_telefono_compania_seguro:
        this.agregaCompania().get('telefonoCompania')!.value,
      p_correo_compania_seguro:
        this.agregaCompania().get('correoCompania')!.value,
      p_estado_compania_seguro: 'ACTIVO',
    };

    this.companiaService.postAgregaCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success(
            'Éxito',
            'Compañía creada correctamente'
          );
          this.dialogRef.close('agregado');
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
