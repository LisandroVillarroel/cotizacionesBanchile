import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

import { ITipoSeguroCompaniaCrear } from '../compania-Interface';
import { IRubro } from '@shared/modelo/rubro-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';

@Component({
  selector: 'app-agrega-tiposeguro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './agrega-tiposeguro.component.html',
  styleUrls: ['./agrega-tiposeguro.component.css'],
})
export class AgregaTiposeguroComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<AgregaTiposeguroComponent>);
  private data = inject(MAT_DIALOG_DATA);

  idRubro = new FormControl<number | null>(null, [Validators.required]);
  idTipoSeguro = new FormControl<number | null>(null, [Validators.required]);

  agregaTipoSeguro = signal<FormGroup>(
    new FormGroup({
      idRubro: this.idRubro,
      idTipoSeguro: this.idTipoSeguro,
    })
  );

  datoRubros = signal<IRubro[]>([]);
  datoTiposSeguro = signal<ITipoSeguro[]>([]);

  ngOnInit(): void {
    this.cargarRubros();
  }

  private cargarRubros(): void {
    this.companiaService.postRubro().subscribe({
      next: (resp: any) => {
        const lista = resp?.p_cursor ?? resp?.data ?? [];
        this.datoRubros.set(lista);
      },
    });
  }

  onSeleccionaRubro(idRubro: number): void {
    this.idTipoSeguro.reset();

    const estructura_codigoRubro = { p_id_rubro: idRubro };

    this.companiaService.postTipoSeguro(estructura_codigoRubro).subscribe({
      next: (dato: any) => {
        if (dato.codigo === 200) {
          const lista = dato.c_TipoSeguros ?? [];
          this.datoTiposSeguro.set(lista);
        }
      },
    });
  }

  getErrorMessage(campo: string): string {
    if (campo === 'idRubro') {
      return this.idRubro.hasError('required') ? 'Debes seleccionar Rubro' : '';
    }
    if (campo === 'idTipoSeguro') {
      return this.idTipoSeguro.hasError('required')
        ? 'Debes seleccionar Tipo de Seguro'
        : '';
    }
    return '';
  }

  grabar(): void {
    if (this.agregaTipoSeguro().invalid) {
      return;
    }

    const payload: ITipoSeguroCompaniaCrear = {
      p_id_usuario: 'adm001',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.idCompania,
      p_id_rubro: Number(this.idRubro.value),
      p_id_tipo_seguro: Number(this.idTipoSeguro.value),
    };

    this.companiaService.postAgregaTipoSeguro(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success(
            'Éxito',
            'Tipo de Seguro compañía creado correctamente'
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
