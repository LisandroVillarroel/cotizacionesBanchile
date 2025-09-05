import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import {
  ISolicitudContratante,
  ITipoRubro,
  ITipoSeguro,
} from './modelo/ingreso-solicitud';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AseguradoComponent } from './asegurado/asegurado.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { MateriaAseguradaComponent } from './materia-asegurada/materia-asegurada.component';
import { ConfirmacionSolicitudDialogComponent } from './confirmacion-solicitud/confirmacion-solicitud.component';

@Component({
  selector: 'app-ingreso-solicitud',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatIconModule,
    MatTableExporterModule,
    MatTooltipModule,
    AseguradoComponent,
    BeneficiarioComponent,
    CuestionarioComponent,
    MateriaAseguradaComponent,
  ],
  templateUrl: './ingreso-solicitud.component.html',
  styleUrl: './ingreso-solicitud.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export default class IngresoSolicitudComponent {
  datoSolicitud: ISolicitudContratante | undefined;
  nombreRazonSocial = signal<string>('');
  rescatadoSeguro = signal<ITipoSeguro[]>([]);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Rubro 1',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Rubro 2',
    },
  ]);

  DatoSeguros = signal<ITipoSeguro[]>([
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Seguro 1 Rubro 1',
      codigoRubro: 1,
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'Seguro 2 Rubro 1',
      codigoRubro: 1,
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Seguro 3 Rubro 1',
      codigoRubro: 1,
    },
    {
      codigoSeguro: 4,
      descripcionSeguro: 'Seguro 4 Rubro 1',
      codigoRubro: 1,
    },
    {
      codigoSeguro: 5,
      descripcionSeguro: 'Seguro 1 Rubro 2',
      codigoRubro: 2,
    },
    {
      codigoSeguro: 6,
      descripcionSeguro: 'Seguro 2 Rubro 2',
      codigoRubro: 2,
    },
    {
      codigoSeguro: 7,
      descripcionSeguro: 'Seguro 3 Rubro 2',
      codigoRubro: 2,
    },
    {
      codigoSeguro: 8,
      descripcionSeguro: 'Seguro 4 Rubro 2',
      codigoRubro: 2,
    },
  ]);

  rutCliente = new FormControl('', [Validators.required, this.validaRut]);
  rubro = new FormControl('', [Validators.required]);
  seguro = new FormControl('', [Validators.required]);
  flagAsegurado = new FormControl(true, [Validators.required]);
  flagBeneficiario = new FormControl(true, [Validators.required]);
  /*  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
  ]);*/

  agregaSolicitudContratante = signal<FormGroup>(
    new FormGroup({
      rutCliente: this.rutCliente,
      rubro: this.rubro,
      seguro: this.seguro,
    })
  );

  agregaSolicitudAsegurado = signal<FormGroup>(
    new FormGroup({
      flagAsegurado: this.flagAsegurado,
    })
  );

  agregaSolicitudBeneficiario = signal<FormGroup>(
    new FormGroup({
      flagBeneficiario: this.flagBeneficiario,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'rutCliente') {
      return this.rutCliente.hasError('required')
        ? 'Debes ingresar rut Cliente'
        : this.rutCliente.hasError('rutInvalido')
        ? 'rut Cliente Inválido'
        : '';
    }

    if (campo === 'seguro') {
      return this.seguro.hasError('required') ? 'Debes ingresar Seguro' : '';
    }

    return '';
  }

  async seleccionaRubro(_codigoRubro: number) {
    this.rescatadoSeguro.set(
      await this.DatoSeguros().filter(
        (rubro) => rubro.codigoRubro == _codigoRubro
      )
    );
    return;
  }

  enviar() {
    alert('Grabar');
  }

  salir() {
    alert('Salir');
  }

  guardarBorrador() {
    alert('guardar borrador');
  }

  async onBlurRutCliente(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaSolicitudContratante()
        .get('rutCliente')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
      await this.nombreRazonSocial.set('Nombre de prueba');
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  abrirDialogoYAvanzar(): void {
    const dato = {
      solicitudId: 'ID123456789',
      fecha: '00 - 00 - 0000',
      rut: '11.111.111-1',
      nombre: 'Juan Alberto Muñoz Sepúlveda',
      ramo: 'Asistencia en viajes',
      cuestionario: 'CUESTIONARIO_COT192839_ASIS_VIAJE_39912.docx',
      documentos: 'COMPILADO_DOCU_ADICIONAL_2025.zip',
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = dato;

    this.dialog
      .open(ConfirmacionSolicitudDialogComponent, dialogConfig)
      .afterClosed();
  }
}
