import { Component, inject, Inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ICompanias } from '@features/detalle-solicitud/modelo/detalle-interface';
import { IAgregaCompania } from '@features/detalle-solicitud/modelo/compania';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { CompaniasContactadasService } from '@features/detalle-solicitud/service/companias-contactadas.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

/* export interface AgregarCompaniaData {
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  id_rubro: number;
  id_tipo_seguro: number;
  id_compania_seguro: number;
  p_id_solicitud: number;
  p_detalle_solicitud_cotizacion: string;
  estadoSolicitud: string;
} */

export interface AgregarCompaniaData {
  p_id_solicitud: number;
  p_id_usuario: string;
  p_tipo_usuario: string;
  id_rubro: number;
  id_tipo_seguro: number;
  fecha: string;
  ejecutivo: string;
}

@Component({
  selector: 'app-agregar-compania',
  standalone: true,
  imports: [
    CommonModule,
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
  notificacioAlertnService = inject(NotificacioAlertnService);

  datoCompanias = signal<ICompanias[]>([]);
  correoCompania = signal<string>('');

  compania = new FormControl<number | null>(null, Validators.required);
  detalleControl = new FormControl('', [
    Validators.maxLength(500),
    Validators.required,
  ]);

  agregaCompania = signal<FormGroup>(
    new FormGroup({
      compania: this.compania,
      detalleControl: this.detalleControl,
    })
  );

  CompaniasContactadasService = inject(CompaniasContactadasService);

  constructor(
    public dialogRef: MatDialogRef<AgregarCompaniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgregarCompaniaData
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

  actualizarCorreo(companiaSeleccionada: number): void {
    var cia = this.datoCompanias()?.filter((item) => {
      return item.id_compania_seguro
        ?.toString()
        .includes(companiaSeleccionada.toString());
    });
    const correoLimpio =
      cia[0].correo_compania_seguro?.replace(/&nbsp;/g, '').trim() || '';

    this.correoCompania.set(correoLimpio);
    //this.data.id_compania_seguro = companiaSeleccionada.id_compania_seguro; // si necesitas guardar el ID
  }

  guardarCompania(): void {
    if (this.agregaCompania().get('detalleControl')!.value === '') {
      return;
    }
    const payload: IAgregaCompania = {
      p_id_solicitud: Number(this.data.p_id_solicitud),
      p_id_compania_seguro: this.agregaCompania().get('compania')!.value,
      p_detalle_solicitud_cotizacion:
        this.agregaCompania().get('detalleControl')!.value,
      p_id_usuario: this.data.p_id_usuario, //'EJ002',
      p_tipo_usuario: this.data.p_tipo_usuario,
    };

    //console.log('Payload enviado:', payload);

    this.CompaniasContactadasService.postAgregaCompania(payload).subscribe({
      next: (res) => {
        if (res.codigo === 200) {
          this.confirmar();
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  async confirmar() {
    const result = await this.notificacioAlertnService.confirmacion(
      'CONFIRMACIÓN',
      'La compañía ha sido agregada exitosamente.'
    );
    if (result) {
      this.dialogRef.close(true);
    }
  }
}
