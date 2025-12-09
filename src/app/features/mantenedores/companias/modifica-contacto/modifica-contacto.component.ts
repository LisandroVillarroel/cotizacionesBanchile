import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IContactoCompaniaModificar } from '../compania-Interface';

@Component({
  selector: 'app-modifica-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './modifica-contacto.component.html',
  styleUrls: ['./modifica-contacto.component.css'],
})
export class ModificaContactoComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<ModificaContactoComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  nombreEjecutivo = new FormControl(this.data.p_nombre_ejecutivo_cia, [
    Validators.required,
  ]);

  correoEjecutivo = new FormControl(this.data.p_correo_ejecutivo_cia, [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);

  // === Form Group con signal (mismo patrón) ===
  modificaContacto = signal<FormGroup>(
    new FormGroup({
      p_nombre_ejecutivo_cia: this.nombreEjecutivo,
      p_correo_ejecutivo_cia: this.correoEjecutivo,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'p_nombre_ejecutivo_cia') {
      return this.nombreEjecutivo.hasError('required')
        ? 'Debe ingresar Nombre Ejecutivo'
        : '';
    }

    if (campo === 'p_correo_ejecutivo_cia') {
      if (this.correoEjecutivo.hasError('required')) {
        return 'Debe ingresar Correo';
      }
      if (this.correoEjecutivo.hasError('pattern')) {
        return 'Debe ingresar un correo válido';
      }
    }

    return '';
  }

  guardar() {
    if (this.modificaContacto().invalid) {
      this.notificacioAlertnService.error(
        'ERROR',
        'Debe completar los campos obligatorios'
      );
      return;
    }

    const payload: IContactoCompaniaModificar = {
      p_id_usuario: 'adm001', // temporal
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.idCompania,
      p_id_ejecutivo_cia: this.data.p_id_ejecutivo_cia,
      p_nombre_ejecutivo_cia: this.nombreEjecutivo.value!,
      p_correo_ejecutivo_cia: this.correoEjecutivo.value!,
    };

    this.companiaService.postModificarContactoCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success('Éxito', resp.vcEstadoCreacion);
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
