import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {
  ISolicitudAsegurado,
  ISolicitudBeneficiario,
  ISolicitudContratante
} from '../../shared/modelo/ingreso-solicitud';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AseguradoComponent } from './asegurado/asegurado.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { MateriaAseguradaComponent } from './materia-asegurada/materia-asegurada.component';
import { ConfirmacionSolicitudDialogComponent } from './confirmacion-solicitud/confirmacion-solicitud.component';
import { SolicitudesService } from '@shared/service/solicitudes.service';
import { RubroService } from '@shared/service/rubro.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { IRubro } from '@shared/modelo/rubro';
import { ITipoSeguro } from '@shared/modelo/tipo-seguro';

@Component({
  selector: 'app-ingreso-solicitud',
  standalone: true,
  imports: [
    CommonModule,
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
    FormsModule,
    MatRadioModule,
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

  flagAseguradoRescata: boolean = false;
  flagBeneficiarioRescata: boolean = false;

  datoAsegurados=signal<ISolicitudAsegurado[] | undefined>(undefined);
  datoBeneficiarios=signal<ISolicitudBeneficiario[] | undefined>(undefined);

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  solicitudesService = inject(SolicitudesService);

  datoRubros = signal<IRubro[]>([]);

  rescatadoSeguro = signal<ITipoSeguro[]>([]);
   /* {
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
  */
/*
    datoAsegurados = signal<ISolicitudAsegurado[]>([
      {
        rutAsegurado: '12514508-6',
        nombreAsegurado: 'Nombre Asegurado 1',
        apellidoPaternoAsegurado: 'apellido Paterno 1',
        apellidoMaternoAsegurado: 'apellido Materno 1',
        regionAsegurado: 'Metropolitana 1',
        ciudadAsegurado: 'Santiago 1',
        comunaAsegurado: 'maipú 1',
        direccionAsegurado: 'dirección  1',
        telefonoAsegurado: '11111111',
        correoAsegurado: 'correo1@gmail.com',
      },
      {
        rutAsegurado: '14245328-2',
        nombreAsegurado: 'Nombre Asegurado 2',
        apellidoPaternoAsegurado: 'apellido Paterno 2',
        apellidoMaternoAsegurado: 'apellido Materno 2',
        regionAsegurado: 'Metropolitana 2',
        ciudadAsegurado: 'Santiago 2',
        comunaAsegurado: 'maipú 2',
        direccionAsegurado: 'dirección  2',
        telefonoAsegurado: '2222222222',
        correoAsegurado: 'correo2@gmail.com',
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
*/
mostrarAnular: boolean = true;
pasoActivoLabel: string = '';


  rutCliente = new FormControl('', [Validators.required, this.validaRut]);
  rubro = new FormControl('', [Validators.required]);
  seguro = new FormControl('', [Validators.required]);
  tipoContratante = new FormControl('', Validators.required);
 flagAsegurado = new FormControl(true, [Validators.required,this.validaQueSeaVerdadero]);
  flagBeneficiario = new FormControl(true, [Validators.required,this.validaQueSeaVerdadero]);

  // Oculta el botón "Anular" solo en el primer paso del stepper.
  // Se actualiza al cargar el componente y cada vez que el usuario cambia de paso.
  @ViewChild('stepper') stepper!: MatStepper;



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
      tipoContratante: this.tipoContratante,
    })
  );

  ngAfterViewInit(): void {
    // Establecer estado inicial
    this.mostrarAnular = this.stepper.selectedIndex !== 0;

    // Escuchar cambios posteriores
    this.stepper.selectionChange.subscribe((event) => {
      this.mostrarAnular = event.selectedIndex !== 0;
    });
  }

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


  async ngOnInit(){
      this.datoAsegurados.set(this.solicitudesService.getSolicitudId('1'))
      this.datoBeneficiarios.set(this.solicitudesService.getBeneficiarioId('1'))
      this.cargaRubro();
  }



  get esPersona(): boolean {
    return this.tipoContratante.value === 'persona';
  }

  cargaRubro() {
   this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
           this.datoRubros.set(dato.items);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:',dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
      },
    });
  }

  async seleccionaRubro(_codigoRubro: string) {
   this.tipoSeguroService.postTipoSeguro(_codigoRubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
           this.rescatadoSeguro.set(dato.items);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:',dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
      },
    });
  }

  enviar() {
    const tipo = this.tipoContratante.value; // 'persona' o 'empresa'
    alert('Grabar');
    //alert(`Grabar solicitud para tipo de contratante: ${tipo}`);
  }

  salir() {
    alert('Salir');
  }

  grabarBorrador() {
    alert('grabar borrador');
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

    //Ajustes clave para evitar espacio en blanco
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
      .open(ConfirmacionSolicitudDialogComponent, dialogConfig)
      .afterClosed();
  }

  validaQueSeaVerdadero(control: AbstractControl): ValidationErrors | null {
        if (control.value !== true) {
            return { isTrue: true }; // La clave del error es 'isTrue'
        }
        return null;
    }

    cambioAseguradoFlag(){
      console.log('ver flag',this.flagAseguradoRescata)
      this.flagAsegurado.setValue(this.flagAseguradoRescata)
    }

  actualizarAsegurado(nuevoAsegurados: ISolicitudAsegurado[]) {
    this.datoAsegurados.set(nuevoAsegurados); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:',this.datoAsegurados())
  }

  cambioBeneficiarioFlag(){
      console.log('ver flag',this.flagAseguradoRescata)
      this.flagBeneficiario.setValue(this.flagBeneficiarioRescata)
    }

  actualizarBeneficiario(nuevoBeneficiarios: ISolicitudBeneficiario[]) {
    this.datoBeneficiarios.set(nuevoBeneficiarios); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:',this.datoBeneficiarios())
  }
}
