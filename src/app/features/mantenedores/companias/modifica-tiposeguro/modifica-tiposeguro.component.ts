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

import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { ITipoSeguroCompaniaModificar } from '../compania-Interface';

@Component({
  selector: 'app-modifica-tiposeguro',
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
  templateUrl: './modifica-tiposeguro.component.html',
  styleUrl: './modifica-tiposeguro.component.css',
})
export class ModificaTiposeguroComponent {
  private companiaService = inject(CompaniaService);
  private notif = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<ModificaTiposeguroComponent>);

  readonly data = inject(MAT_DIALOG_DATA);

  // FORM CONTROLS
  rubro = new FormControl({ value: this.data.p_id_rubro, disabled: true });
  tipoSeguro = new FormControl({
    value: this.data.p_id_tipo_seguro,
    disabled: true,
  });

  estadoTipoSeguro = new FormControl(this.data.p_estado_tipo_seguro, [
    Validators.required,
  ]);

  modificaTipoSeguro = signal<FormGroup>(
    new FormGroup({
      estadoTipoSeguro: this.estadoTipoSeguro,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'estadoTipoSeguro') {
      return this.estadoTipoSeguro.hasError('required')
        ? 'Debes seleccionar Estado'
        : '';
    }
    return '';
  }

  guardar() {
    if (this.modificaTipoSeguro().invalid) {
      this.notif.error('ERROR', 'Debe completar los campos obligatorios');
      return;
    }

    const payload: ITipoSeguroCompaniaModificar = {
      p_id_usuario: 'adm001',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.p_id_compania_seguro,
      p_id_rubro: this.data.p_id_rubro,
      p_id_tipo_seguro: this.data.p_id_tipo_seguro,
      p_estado_tipo_seguro: this.estadoTipoSeguro.value!,
    };

    this.companiaService.postModificarTipoSeguroCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notif.success('Éxito', resp.vcEstadoCreacion);
          this.dialogRef.close('modificado');
        } else {
          this.notif.error('ERROR', resp.mensaje);
        }
      },
      error: () => {
        this.notif.error('ERROR', 'Error inesperado');
      },
    });
  }
}
