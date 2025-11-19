import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '../../../../shared/ui/cabeceraPopup.component';
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatOption, MatSelectModule } from '@angular/material/select';
import {
  validateRut,
  formatRut,
  RutFormat,
  cleanRut,
} from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    CabeceraPopupComponente,
  ],
  templateUrl: './agrega-compania.component.html',
  styleUrl: './agrega-compania.component.css',
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
    Validators.pattern(/^(9\d{8}|\+56\d{9})$/), // Ajusta patrón si quieres validar formato chileno
  ]);
  estadoCompania = new FormControl('Vigente', [Validators.required]);
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

  getErrorMessage(campo: string): string {
    switch (campo) {
      case 'rutCompania':
        return this.rutCompania.hasError('required')
          ? 'Debes ingresar Rut'
          : this.rutCompania.hasError('rutInvalido')
          ? 'Rut inválido'
          : '';
      case 'nombreCompania':
        return this.nombreCompania.hasError('required')
          ? 'Debes ingresar nombre'
          : '';
      case 'direccionCompania':
        return this.direccionCompania.hasError('required')
          ? 'Debes ingresar dirección'
          : '';
      case 'telefonoCompania':
        if (this.telefonoCompania.hasError('required'))
          return 'Debes ingresar teléfono';
        if (this.telefonoCompania.hasError('pattern'))
          return 'Formato inválido (+569XXXXXXXX)';
        break;
      case 'correoCompania':
        if (this.correoCompania.hasError('required'))
          return 'Debes ingresar correo';
        if (this.correoCompania.hasError('pattern')) return 'Correo inválido';
        break;
    }
    return '';
  }

  async onBlurRutCompania(event: any) {
    const rut = event.target.value;
    if (validateRut(rut)) {
      await this.agregaCompania()
        .get('rutCompania')!
        .setValue(formatRut(cleanRut(rut), RutFormat.DOTS_DASH), {
          emitEvent: false,
        });
    } else {
      this.notificacioAlertnService.error('ERROR', 'Rut inválido');
    }
  }

  grabar() {
    if (this.agregaCompania().invalid) return;

    const rutVisual = this.rutCompania.value!;
    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    const payload = {
      p_id_usuario: 'ADM042', // parametrizable
      p_tipo_usuario: 'A',
      p_rut_compania_seguro: rutParaBD,
      p_nombre_compania_seguro: this.nombreCompania.value,
      p_direccion_compania_seguro: this.direccionCompania.value,
      p_telefono_compania_seguro: this.telefonoCompania.value,
      p_estado_compania_seguro: this.estadoCompania.value,
      p_correo_compania_seguro: this.correoCompania.value,
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
