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
import { ICompanias, ICompaniasResponse } from '@features/detalle-solicitud/modelo/detalle-interface';
import { IModificaCompania } from '@features/detalle-solicitud/modelo/compania';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { CompaniasContactadasService } from '@features/detalle-solicitud/service/companias-contactadas.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

export interface VerCompaniaData {
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_detalle_solicitud_cotizacion: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
  id_rubro: number;
  id_tipo_seguro: number;
  fecha: string;
  ejecutivo: string;
  nombre_compania_seguro: string;
  correo: string;
  p_id_detalle_solicitud_cotizacion: string;
}

@Component({
  selector: 'app-ver-compania',
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
  templateUrl: './ver-compania.component.html',
  styleUrl: './ver-compania.component.css',
})
export class VerCompaniaComponent {
  notificacioAlertnService = inject(NotificacioAlertnService);

  datoCompanias = signal<ICompanias[]>([]);
  correoCompania = signal<string>('');

  compania = new FormControl<number | null>(null, Validators.required);
  detalleControl = new FormControl('', [
    Validators.maxLength(500),
    Validators.required,
  ]);

  verCompania = signal<FormGroup>(
    new FormGroup({
      compania: this.compania,
      detalleControl: this.detalleControl,
    })
  );

  CompaniasContactadasService = inject(CompaniasContactadasService);

  constructor(
    public dialogRef: MatDialogRef<VerCompaniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VerCompaniaData
  ) {
    console.log('Data en constructor:', data);
  }

  observaciones: string = '';

  OnInit() {
   /*  console.log('Data completa en ngOnInit:', this.data);
    console.log('Detalle recibido:', this.data.p_id_detalle_solicitud_cotizacion);
 */
    this.detalleControl.setValue(
      this.data.p_id_detalle_solicitud_cotizacion || ''
    );
    /* console.log(
      'Valor en detalleControl después de setValue:',
      this.detalleControl.value
    ); */

    this.cargarCompanias();
  }

  cargarCompanias(): void {
    const entradas = {
      p_rubro: this.data.id_rubro,
      p_tipo_seguro: this.data.id_tipo_seguro,
    };
    console.log('Entradas', entradas);

    this.CompaniasContactadasService.postCompaniasTipoSeguro(
      entradas
    ).subscribe({
      next: (dato: ICompaniasResponse) => {
        if (dato.codigo === 200) {
          this.datoCompanias.set(dato.p_cursor);
          //console.log('Compañías', this.datoCompanias());
          this.setCorreoCompania();
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener  el listado de compañías.');
      },
    });
  }

  setCorreoCompania(): void {
    let cia;

    if (this.data.p_id_compania_seguro) {
      // Buscar por ID
      cia = this.datoCompanias()?.find(
        (item) => item.id_compania_seguro === this.data.p_id_compania_seguro
      );
    } else if (this.data.nombre_compania_seguro) {
      // Si no hay ID, buscar por nombre
      cia = this.datoCompanias()?.find(
        (item) =>
          item.nombre_compania_seguro === this.data.nombre_compania_seguro
      );
    }

    const correoLimpio = cia?.correo_compania_seguro
      ? cia.correo_compania_seguro.replace(/&nbsp;/g, '').trim()
      : '';

    //console.log('Correo encontrado:', correoLimpio);
    this.correoCompania.set(correoLimpio);
  }

  actualizarCorreo(companiaSeleccionada: number): void {
/*     console.log('ID seleccionado:', companiaSeleccionada);
    console.log('Lista compañías:', this.datoCompanias()); */

    const cia = this.datoCompanias()?.find(
      (item) => item.id_compania_seguro === companiaSeleccionada
    );

    console.log('Compañía encontrada:', cia);

    const correoLimpio = cia?.correo_compania_seguro
      ? cia.correo_compania_seguro.replace(/&nbsp;/g, '').trim()
      : '';

   // console.log('Correo encontrado:', correoLimpio);
    this.correoCompania.set(correoLimpio);
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return 'Campo inválido';
  }

  modificarCompania(): void {
    if (!this.detalleControl.value) return;

    const payload: IModificaCompania = {
      p_id_solicitud: Number(this.data.p_id_solicitud),
      p_id_compania_seguro: this.data.p_id_compania_seguro,
      p_detalle_solicitud_cotizacion: this.detalleControl.value,
      p_id_usuario: this.data.p_id_usuario,
      p_tipo_usuario: this.data.p_tipo_usuario,
    };

    //console.log('Payload enviado:', payload);

    this.CompaniasContactadasService.postModificaCompania(payload).subscribe({
      next: (res) => {
        if (res.codigo === 200) {
          this.confirmar();
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible modificar la compañía.');
      },
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  async confirmar() {
    const result = await this.notificacioAlertnService.confirmacion(
      'CONFIRMACIÓN',
      'El detalle ha sido modificado exitosamente.'
    );
    if (result) {
      this.dialogRef.close({
        id_compania_seguro: this.data.p_id_compania_seguro,
        detalle: this.detalleControl.value,
      });
    }
  }
}
