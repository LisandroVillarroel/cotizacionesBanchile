import {
  Component,
  ViewEncapsulation,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {
  IIngresoSolicitud,
  ISolicitudBeneficiario,
} from './modelo/ingresoSolicitud-Interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

import { AseguradoComponent } from './asegurado/asegurado.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { MateriaAseguradaComponent } from './materia-asegurada/materia-asegurada.component';
import { ConfirmacionSolicitudDialogComponent } from './confirmacion-solicitud/confirmacion-solicitud.component';

import { RubroService } from '@shared/service/rubro.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { IRubro } from '@shared/modelo/rubro-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { MatCardContent, MatCard } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IngresoSolicitudService } from './service/ingreso-solicitud.service';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-ingreso-solicitud',
  standalone: true,
  imports: [
    MatRadioModule,
    MatCardModule,
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
    MatTooltipModule,
    FormsModule,
    AseguradoComponent,
    BeneficiarioComponent,
    CuestionarioComponent,
    MateriaAseguradaComponent,
    MatCardContent,
    MatCard,
    MatCheckboxModule,
  ],
  templateUrl: './ingreso-solicitud.component.html',
  styleUrl: './ingreso-solicitud.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export default class IngresoSolicitudComponent {
  ingresoSolicitud!: IIngresoSolicitud;
  nombreRazonSocial = signal<string>('');

  flagAseguradoRescata: boolean = false;
  flagBeneficiarioRescata: boolean = false;

  //datoAsegurados = signal<ISolicitudAsegurado[] | undefined>(undefined);
  datoBeneficiarios = signal<ISolicitudBeneficiario[] | undefined>(undefined);

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  ingresoSolicitudService = inject(IngresoSolicitudService);

  esIgualAlAsegurado: boolean = false;

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  datoRubros = signal<IRubro[]>([]);

  rescatadoSeguro = signal<ITipoSeguro[]>([]);

  //mostrarAnular: boolean = true;
  pasoActivoLabel: string = '';

  rutCliente = new FormControl('', [Validators.required, this.validaRut]);
  rubro = new FormControl('', [Validators.required]);
  seguro = new FormControl('', [Validators.required]);
  aseguradeCheck = new FormControl(false, [Validators.required]);

  flagAsegurado = new FormControl(true, [
    Validators.required,
    this.validaQueSeaVerdadero,
  ]);
  flagBeneficiario = new FormControl(true, [
    Validators.required,
    this.validaQueSeaVerdadero,
  ]);

  @ViewChild(CuestionarioComponent)
  cuestionarioComponent!: CuestionarioComponent;

  // Oculta el botón "Anular" solo en el primer paso del stepper.
  // Se actualiza al cargar el componente y cada vez que el usuario cambia de paso.
  @ViewChild('stepper') stepper!: MatStepper;

  /*  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
  ]);*/

  //Declara los datos del contratante para panel
  contratanteInfo = signal<{
    id?: number;
    rut_contratante: string;
    nombre: string;
  }>({
    rut_contratante: '',
    nombre: '',
  });

  agregaSolicitudContratante = signal<FormGroup>(
    new FormGroup({
      rutCliente: this.rutCliente,
      rubro: this.rubro,
      seguro: this.seguro,
      aseguradeCheck: this.aseguradeCheck,
    })
  );

  /*  ngAfterViewInit(): void {
    // Establecer estado inicial
    this.mostrarAnular = this.stepper.selectedIndex !== 0;

    // Escuchar cambios posteriores
    this.stepper.selectionChange.subscribe((event) => {
      this.mostrarAnular = event.selectedIndex !== 0;
    });
  }*/

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

  async ngOnInit() {
    this.cargaRubro();
  }

  cargaRubro() {
    console.log('paso rubro')
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          console.log()
          this.datoRubros.set(dato.p_cursor);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
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
    const estructura_codigoRubro = { id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
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

  grabaConTratante() {
    console.log('form contratante:', this.agregaSolicitudContratante().value);
    console.log(
      'aseguradeCheck:',
      this.agregaSolicitudContratante().get('aseguradeCheck')!.value
    );
    this.ingresoSolicitud = {
      id_ejecutivo_banco: this._storage()?.usuarioLogin.codigoEjecutivo!,
      contratante: {
        rut_contratante:
          this.agregaSolicitudContratante().get('rutCliente')!.value,
        nombre_razon_social_contratante: this.nombreRazonSocial(),
        mail_contratante: 'mail_contratante',
        telefono_contratante: 'telefono_contratante',
        region_contratante: 'region_contratante',
        ciudad_contratante: 'ciudad_contratante',
        comuna_contratante: 'comuna_contratante',
        direccion_contratante: 'direccion_contratante',
        numero_dir_contratante: 'n',
        departamento_block_contratante: 'a',
        casa_contratante: 'c',
      },
      id_rubro: this.agregaSolicitudContratante().get('rubro')!.value,
      id_tipo_seguro: this.agregaSolicitudContratante().get('seguro')!.value,
      // asegurados: [],
      // beneficiarios: [],
    };
    console.log('ingreso solicitud:', this.ingresoSolicitud);
    this.ingresoSolicitudService
      .postIngresoSolicitud(this.ingresoSolicitud)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Grabó bien');
            if (
              this.agregaSolicitudContratante().get('aseguradeCheck')!.value
            ) {
              this.guardaAsegurado();
            }
            // Actualizar el signal para mostrar datos del contratante en panel

            this.contratanteInfo.set({
              id: 999, // ID en duro para prueba
              rut_contratante:
                this.agregaSolicitudContratante().get('rutCliente')!.value,
              nombre: this.nombreRazonSocial(),
            });
          } else {
            if (dato.codigo != 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
              alert('Error:' + dato.mensaje);
              console.log('ERROR DE SISTEMA:');
            }
          }
        },
        error: (error) => {
          console.log('ERROR INESPERADO', error);
        },
      });
  }

  guardaAsegurado() {}

  salir() {
    this.router.navigate(['/principal/inicio']);
  }

  async onBlurRutCliente(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaSolicitudContratante()
        .get('rutCliente')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
      await this.nombreRazonSocial.set('Nombre de prueba22222');
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  puedeEnviar(): boolean {
    return this.cuestionarioComponent?.archivoObligatorioCargado() ?? false;
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

  get mostrarDatosAsegurado(): boolean {
    return !this.esIgualAlAsegurado;
  }

  cambioAseguradoFlag() {
    console.log('ver flag', this.flagAseguradoRescata);
    this.flagAsegurado.setValue(this.flagAseguradoRescata);
  }

  /*
  actualizarAsegurado(nuevoAsegurados: ISolicitudAsegurado[]) {
    this.datoAsegurados.set(nuevoAsegurados); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:', this.datoAsegurados());
  }
*/
  cambioBeneficiarioFlag() {
    console.log('ver flag', this.flagAseguradoRescata);
    this.flagBeneficiario.setValue(this.flagBeneficiarioRescata);
  }

  actualizarBeneficiario(nuevoBeneficiarios: ISolicitudBeneficiario[]) {
    this.datoBeneficiarios.set(nuevoBeneficiarios); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:', this.datoBeneficiarios());
  }
}
