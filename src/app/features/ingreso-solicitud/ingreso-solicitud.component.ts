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
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {
  IAsegurado,
  IIngresoSolicitud,
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

import { MatCardContent, MatCard } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { RubroService } from '@shared/service/rubro.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { IngresoSolicitudService } from './service/ingreso-solicitud.service';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { AseguradoService } from './service/asegurado.service';

import { IRubro } from '@shared/modelo/rubro-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

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
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService= inject(NotificacioAlertnService);

  ingresoSolicitud!: IIngresoSolicitud;
  nombreRazonSocial = signal<string>('');
  idSolicitud = signal<string>('0');

  flagAseguradoRescata: boolean = false;
  flagBeneficiarioRescata: boolean = false;

  asegurado!: IAsegurado;
  aseguradoService = inject(AseguradoService);

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  ingresoSolicitudService = inject(IngresoSolicitudService);

  esIgualAlAsegurado: boolean = false;

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  datoRubros = signal<IRubro[]>([]);

  rescatadoSeguro = signal<ITipoSeguro[]>([]);


  hayAsegurados = signal(false);

  //mostrarAnular: boolean = true;
  pasoActivoLabel: string = '';

  rutCliente = new FormControl('', [Validators.required, this.validaRut]);
  rubro = new FormControl('', [Validators.required]);
  seguro = new FormControl('', [Validators.required]);
  aseguradeCheck = new FormControl(false, [Validators.required]);

  flagAsegurado = new FormControl(false, [
    Validators.required,
    this.validaQueSeaVerdadero,
  ]);
  flagBeneficiario = new FormControl(true, [
    Validators.required,
    this.validaQueSeaVerdadero,
  ]);

  @ViewChild(CuestionarioComponent)
  cuestionarioComponent!: CuestionarioComponent;

  @ViewChild('stepper') stepper!: MatStepper;

  //Declara los datos del contratante para panel
  contratanteInfo = signal({
    id: '0',
    rut_contratante: '',
    nombre: '',
    idRubro: 0,
    idSeguro: 0,
  });

  agregaSolicitudContratante = signal<FormGroup>(
    new FormGroup({
      rutCliente: this.rutCliente,
      rubro: this.rubro,
      seguro: this.seguro,
      aseguradeCheck: this.aseguradeCheck,
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
        ? 'Debes ingresar rut de contratante'
        : this.rutCliente.hasError('rutInvalido')
          ? 'RUT Cliente inválido'
          : '';
    }

    if (campo === 'rubro') {
      return this.rubro.hasError('required') ? 'Debes seleccionar un rubro' : '';
    }

    if (campo === 'seguro') {
      return this.seguro.hasError('required') ? 'Debes ingresar seguro' : '';
    }

    return '';
  }

   ngOnInit() {
    console.log('PASO PROGRESO')
    this.cargaRubro();
  }

  cargaRubro() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          console.log('paso biennn rubro')
          console.log();
          this.datoRubros.set(dato.p_cursor);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('Error de Sistema:');
          }
        }
      },
      error: (error) => {
        console.log('Error Inesperado', error);
      },
    });
  }

  async seleccionaRubro(_codigoRubro: number) {
    const estructura_codigoRubro = { p_id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('Error de Sistema:');
          }
        }
      },
      error: (error) => {
        console.log('Error Inesperado', error);
      },
    });
  }

  grabaContratanteAux() { }

  async grabaContratante() {
    console.log('form contratante:', this.agregaSolicitudContratante().value);
    console.log(
      'aseguradeCheck:',
      this.agregaSolicitudContratante().get('aseguradeCheck')!.value
    );
    this.ingresoSolicitud = {
      id_ejecutivo_banco: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
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
    console.log('Ingreso Solicitud:', this.ingresoSolicitud);
    await this.ingresoSolicitudService
      .postIngresoSolicitud(this.ingresoSolicitud)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            // Actualizar el signal para mostrar datos del contratante en panel
            this.contratanteInfo.set({
              id: dato.p_id_solicitud,
              rut_contratante:
                this.agregaSolicitudContratante().get('rutCliente')!.value,
              nombre: this.nombreRazonSocial(),
              idRubro: this.agregaSolicitudContratante().get('rubro')!.value,
              idSeguro: this.agregaSolicitudContratante().get('seguro')!.value,
            });
            if (
              this.agregaSolicitudContratante().get('aseguradeCheck')!.value ==
              true
            ) {
              this.agregarAsegurado();
            } else {
              this.idSolicitud.set(dato.p_id_solicitud);
            }
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }

  valorAsegurado(dato: boolean) {
       this.agregaSolicitudAsegurado().get('flagAsegurado')?.setValue(dato)
  }

  async agregarAsegurado() {
    this.asegurado = {
      p_id_solicitud: Number(this.contratanteInfo().id),
      p_rut_asegurado: this.ingresoSolicitud.contratante.rut_contratante,
      p_nombre_razon_social_asegurado:
        this.ingresoSolicitud.contratante.nombre_razon_social_contratante,
      p_mail_asegurado: this.ingresoSolicitud.contratante.mail_contratante,
      p_telefono_asegurado:
        this.ingresoSolicitud.contratante.telefono_contratante,
      p_region_asegurado: this.ingresoSolicitud.contratante.region_contratante,
      p_ciudad_asegurado: this.ingresoSolicitud.contratante.ciudad_contratante,
      p_comuna_asegurado: this.ingresoSolicitud.contratante.comuna_contratante,
      p_direccion_asegurado:
        this.ingresoSolicitud.contratante.direccion_contratante,
      p_numero_dir_asegurado:
        this.ingresoSolicitud.contratante.numero_dir_contratante,
      p_departamento_block_asegurado:
        this.ingresoSolicitud.contratante.departamento_block_contratante,
      p_casa_asegurado: this.ingresoSolicitud.contratante.casa_contratante,
      p_usuario_creacion: this._storage()?.usuarioLogin.usuario,
    };


    await this.aseguradoService.postAgregaAsegurado(this.asegurado).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.idSolicitud.set(this.contratanteInfo().id);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
      },
    });
  }

  async onBlurRutCliente(event: any) {
    const rut = event.target.value;

    if (validateRut(rut) === true) {
      await this.agregaSolicitudContratante()
        .get('rutCliente')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
      await this.nombreRazonSocial.set('Nombre de Prueba');
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null as any;
  }

  validaQueSeaVerdadero(control: AbstractControl): ValidationErrors | null {
    if (control.value !== true) {
      return { isTrue: true }; // La clave del error es 'isTrue'
    }
    return null;
  }

  puedeEnviar(): boolean {
    return this.cuestionarioComponent?.archivoObligatorioCargado() ?? false;
  }

  validarCambioPaso(event: StepperSelectionEvent, stepper: MatStepper) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);

    const pasoActual = event.previouslySelectedIndex;
    const pasoDestino = event.selectedIndex;

    // Si estoy en paso (asegurado) y quiero ir al paso (contratante)
    if (pasoActual >= 1 && pasoDestino === 0) {

        this.notificacioAlertnService.info('INGRESO SOLICITUD','Acceso denegado')
        setTimeout(() => {
          stepper.selectedIndex = pasoActual;
        });
        return;

    }

    // Si estoy en paso (asegurado) y quiero ir a pasos siguientes (3, 4, 5)
    /*
    if (pasoActual === 1 && pasoDestino > 1) {
      if (!this.hayAsegurados()) {
        alert('Debe ingresar al menos un asegurado antes de continuar.');
        setTimeout(() => {
          stepper.selectedIndex = pasoActual;
        });
        return;
      }
    }
    */
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

  salir() {
    this.router.navigate(['/principal/inicio']);
  }

  get mostrarDatosAsegurado(): boolean {
    return !this.esIgualAlAsegurado;
  }
}
