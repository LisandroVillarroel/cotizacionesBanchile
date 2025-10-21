import { Component, inject, Inject, input, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAgregadaCiaComponent } from './solicitud-agregada-cia/solicitud-agregada-cia.component';
import { CompaniasContactadasService } from '../companias-contactadas.service';
import { ICompanias } from '@features/detalle-solicitud/modelo/detalle-interface';
import { IAgregaCompania } from '@features/detalle-solicitud/modelo/compania';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

export interface AgregarCompaniaData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  id_rubro: number;
  id_tipo_seguro: number;
  id_compania_seguro: number;
  p_id_solicitud: number;
  p_detalle_solicitud_cotizacion: string;
  estadoSolicitud: string;
}

@Component({
  selector: 'app-agregar-compania',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatDivider,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './agregar-compania.component.html',
  styleUrl: './agregar-compania.component.css',
})
export class AgregarCompaniaComponent {
  idSolicitud = input.required<string>();
  idSolicitudParametro = signal<string>('175');
  datoCompanias = signal<ICompanias[]>([]);
  correoCompania = signal<string>('');

  compania = new FormControl<number | null>(null, Validators.required);
  detalleControl = new FormControl('', [Validators.maxLength(500)]);

  CompaniasContactadasService = inject(CompaniasContactadasService);

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarCompaniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgregarCompaniaData,
    private snackBar: MatSnackBar
  ) {}

  registros: any[] = [];
  observaciones: string = '';

  ngOnInit() {
    this.cargarCompanias();
  }

  cargarCompanias(): void {
    const entradas = {
      p_rubro: this.data.id_rubro,
      p_tipo_seguro: this.data.id_tipo_seguro,
    };

    this.CompaniasContactadasService.postCompaniasTipoSeguro(
      entradas
    ).subscribe({
      next: (dato: any) => {
        if (dato.codigo === 200) {
          this.datoCompanias.set(dato.p_cursor);
        }
      },
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return 'Campo inválido';
  }

  actualizarCorreo(companiaSeleccionada: any): void {
    const correoLimpio =
      companiaSeleccionada?.correo_compania_seguro
        ?.replace(/&nbsp;/g, '')
        .trim() || '';
    this.correoCompania.set(correoLimpio);
    this.data.id_compania_seguro = companiaSeleccionada.id_compania_seguro; // si necesitas guardar el ID
  }

  guardarCompania(): void {
    const payload: IAgregaCompania = {
      p_id_solicitud: Number(this.data.solicitudId),
      p_id_compania_seguro: this.data.id_compania_seguro,
      p_detalle_solicitud_cotizacion: this.detalleControl.value ?? '',
      p_id_usuario: 'EJ002',
      p_tipo_usuario: 'E',
    };

    console.log('Payload enviado:', payload);

    this.CompaniasContactadasService.postAgregaCompania(payload).subscribe({
      next: (res) => {
        if (res.codigo === 200) {
          this.snackBar.open('Compañía agregada exitosamente.', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        } else {
          this.snackBar.open('Error al agregar la compañía.', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: () => {
        if (
          !payload.p_id_solicitud ||
          !payload.p_id_compania_seguro ||
          !payload.p_id_usuario ||
          !payload.p_tipo_usuario
        ) {
          this.snackBar.open(
            'Faltan datos obligatorios en la solicitud.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          return;
        }
      },
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  enviadoCia(): void {
    if (!this.compania.value) {
      alert('Debes seleccionar una compañía antes de continuar.');
      return;
    }

    const estructura = {
      p_id_solicitud: Number(this.idSolicitud()),
      p_id_compania_seguro: this.compania.value,
      p_detalle_solicitud_cotizacion: this.observaciones,
      p_id_usuario: 'EJ001',
      p_tipo_usuario: 'EJECUTIVO',
    };

    this.CompaniasContactadasService.postAgregaCompania(estructura).subscribe({
      next: (respuesta) => {
        if (respuesta.codigo === 200) {
          const dato = {
            solicitudId: this.data.solicitudId,
            fecha: this.data.fecha,
            ejecutivo: this.data.ejecutivo,
          };

          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '600px';
          dialogConfig.maxHeight = '90vh';
          dialogConfig.panelClass = 'custom-dialog-container';
          dialogConfig.data = dato;

          this.dialog
            .open(SolicitudAgregadaCiaComponent, dialogConfig)
            .afterClosed();
        } else {
          alert(`Error: ${respuesta.mensaje}`);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error inesperado al enviar la solicitud:', err.message);
        alert('Error inesperado al enviar la solicitud.');
      },
    });
  }
}
