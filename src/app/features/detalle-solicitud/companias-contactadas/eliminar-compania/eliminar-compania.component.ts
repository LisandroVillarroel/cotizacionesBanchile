import { Component, inject, Inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ICompanias } from '@features/detalle-solicitud/modelo/detalle-interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { CompaniasContactadasService } from '@features/detalle-solicitud/service/companias-contactadas.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IEliminaCompania } from '@features/detalle-solicitud/modelo/compania';

export interface EliminarCompaniaData {
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

@Component({
  selector: 'app-eliminar-compania',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './eliminar-compania.component.html',
  styleUrl: './eliminar-compania.component.css',
})
export class EliminarCompaniaComponent {
  cargando = signal(false);

  notificacioAlertnService = inject(NotificacioAlertnService);

  datoCompanias = signal<ICompanias[]>([]);
  correoCompania = signal<string>('');

  compania = new FormControl<number | null>(null, Validators.required);
  detalleControl = new FormControl('', [
    Validators.maxLength(500),
    Validators.required,
  ]);

  eliminaCompania = signal<FormGroup>(
    new FormGroup({
      compania: this.compania,
      detalleControl: this.detalleControl,
    })
  );

  CompaniasContactadasService = inject(CompaniasContactadasService);

  constructor(
    public dialogRef: MatDialogRef<EliminarCompaniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EliminarCompaniaData
  ) {}

  confirmarEliminacion(): void {
    this.cargando.set(true);

    const payload: IEliminaCompania = {
      p_id_solicitud: this.data.p_id_solicitud,
      p_id_compania_seguro: this.data.p_id_compania_seguro,
      p_id_usuario: this.data.p_id_usuario,
      p_tipo_usuario: this.data.p_tipo_usuario,
    };

    this.CompaniasContactadasService.postEliminaCompania(payload).subscribe({
      next: async (res) => {
        this.cargando.set(false);
        if (res.codigo === 200) {
          const result = await this.notificacioAlertnService.confirmacion(
            'CONFIRMACIÓN',
            'La compañía ha sido eliminada exitosamente.'
          );
          if (result) {
            this.dialogRef.close(true);
          }
        } else {
          this.notificacioAlertnService.error(
            'ERROR',
            'No se pudo eliminar la compañía'
          );
          this.dialogRef.close(false);
        }
      },
      error: () => {
        this.cargando.set(false);
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
        this.dialogRef.close(false);
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
