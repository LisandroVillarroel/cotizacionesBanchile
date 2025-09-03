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
  MatPaginator,
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
  ISolicitudBeneficiario,
  ISolicitudContratante,
  ITipoRubro,
  ITipoSeguro,
} from './modelo/ingreso-solicitud';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AgregaSolicitudBeneficiarioComponent } from './beneficiario/agrega-solicitud-beneficiario/agrega-solicitud-beneficiario.component';
import { ModificaSolicitudBeneficiarioComponent } from './beneficiario/modifica-solicitud-beneficiario/modifica-solicitud-beneficiario.component';
import { ConsultaSolicitudBeneficiarioComponent } from './beneficiario/consulta-solicitud-beneficiario/consulta-solicitud-beneficiario.component';
import { EliminaSolicitudBeneficiarioComponent } from './beneficiario/elimina-solicitud-beneficiario/elimina-solicitud-beneficiario.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { AseguradoComponent } from './asegurado/asegurado.component';

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
    CuestionarioComponent,
    AseguradoComponent
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



  /* modulo 3 Beneficiarios*/
  public nombreArchivoBeneficiario = 'Beneficiario';

  displayedColumnsBeneficiario: string[] = [
    'index',
    'rutBeneficiario',
    'nombreBeneficiario',
    'apellidoPaternoBeneficiario',
    'apellidoMaternoBeneficiario',
    'regionBeneficiario',
    'ciudadBeneficiario',
    'comunaBeneficiario',
    'direccionBeneficiario',
    'telefonoBeneficiario',
    'correoBeneficiario',
    'opciones',
  ];
  dataSourceBeneficiario = new MatTableDataSource<ISolicitudBeneficiario>();

  @ViewChild(MatPaginator)
  paginatorBeneficiario!: MatPaginator;
  @ViewChild(MatSort) sortBeneficiario!: MatSort;

  applyFilterBeneficiario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBeneficiario.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceBeneficiario.paginator) {
      this.dataSourceBeneficiario.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSourceBeneficiario.paginator = this.paginatorBeneficiario;
    this.dataSourceBeneficiario.sort = this.sortBeneficiario;
  }
  /*Fin modulo Beneficiario*/

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



  datoBeneficiarios = signal<ISolicitudBeneficiario[]>([
    {
      rutBeneficiario: '12514508-6',
      nombreBeneficiario: 'Nombre Beneficiario 1',
      apellidoPaternoBeneficiario: 'apellido Paterno 1',
      apellidoMaternoBeneficiario: 'apellido Materno 1',
      regionBeneficiario: 'Metropolitana 1',
      ciudadBeneficiario: 'Santiago 1',
      comunaBeneficiario: 'maipú 1',
      direccionBeneficiario: 'dirección  1',
      telefonoBeneficiario: '11111111',
      correoBeneficiario: 'correo1@gmail.com',
    },
    {
      rutBeneficiario: '14245328-2',
      nombreBeneficiario: 'Nombre Beneficiario 2',
      apellidoPaternoBeneficiario: 'apellido Paterno 2',
      apellidoMaternoBeneficiario: 'apellido Materno 2',
      regionBeneficiario: 'Metropolitana 2',
      ciudadBeneficiario: 'Santiago 2',
      comunaBeneficiario: 'maipú 2',
      direccionBeneficiario: 'dirección  2',
      telefonoBeneficiario: '2222222222',
      correoBeneficiario: 'correo2@gmail.com',
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

    /*
    await this.cargaRaza(
      this.id_EmpresaLaboratorio,
      this.rescatadoEspecie.nombre,
      '0'
    );
    */
    return;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceBeneficiario.data = this.datoBeneficiarios();
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


  /*Modulo 2 Beneficiario*/
  agregaNuevoBeneficiario() {
    //  agregaNuevo(empresaInterface_: EmpresaI) {
    // Nuevo
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {};
    //  dialogConfig.data = {
    //    idProducto: idProdP,
    //    titulo: tituloP
    //  };

    this.dialog
      .open(AgregaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
  }

  modificaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ModificaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
  }

  consultaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ConsultaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
  }

  eliminaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(EliminaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
  }

  async refreshTableBeneficiario() {
    // await this.getListCliente();
    this.dataSourceBeneficiario.paginator?.pageSize !=
      this.paginatorBeneficiario.pageSize;
  }
  /*Fin Modulo 2 Beneficiario*/
}
