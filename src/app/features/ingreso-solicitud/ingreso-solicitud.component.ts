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
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  validateRut,
  formatRut,
  RutFormat,
  cleanRut,
} from '@fdograph/rut-utilities';
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
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';


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
  notificacioAlertnService = inject(NotificacioAlertnService);

  ingresoSolicitud!: IIngresoSolicitud;
  nombreRazonSocial = signal<string>('');
  emailContratante = signal<string>('');
  telefonoContratante = signal<string>('');

  //idSolicitud = signal<string>('0');
  idSolicitud = 0;
  flagAseguradoRescata: boolean = false;
  flagBeneficiarioRescata: boolean = false;

  asegurado!: IAsegurado;
  aseguradoService = inject(AseguradoService);

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  ingresoSolicitudService = inject(IngresoSolicitudService);
  solicitudService = inject(DetalleSolicitudService);

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
    id: 0,
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

  agregaAsegurado = signal<FormGroup>(
    new FormGroup({
      flagAsegurado: this.flagAsegurado,
    })
  );

  agregaBeneficiario = signal<FormGroup>(
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
      return this.rubro.hasError('required')
        ? 'Debes seleccionar un rubro'
        : '';
    }

    if (campo === 'seguro') {
      return this.seguro.hasError('required') ? 'Debes ingresar seguro' : '';
    }

    return '';
  }

  OnInit() {
    this.cargaRubro();
  }

  cargaRubro() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener el listado de Rubros.');
      },
    });
  }

  async seleccionaRubro(_codigoRubro: number) {
    //const estructura_codigoRubro = { p_id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(_codigoRubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener el listado de Tipos de Seguros.');
      },
    });
  }

  buscarContratantePorRut() {
    let rutIngresado = this.rutCliente.value;

    if (rutIngresado && this.rutCliente.invalid) {
      this.notificacioAlertnService.error('ERROR', 'RUT inválido');
      return;
    }

    if (!rutIngresado) {
      return;
    }

    if (validateRut(rutIngresado)) {
      this.rutCliente.setValue(
        formatRut(cleanRut(rutIngresado), RutFormat.DOTS_DASH),
        { emitEvent: false }
      );

      rutIngresado = formatRut(cleanRut(rutIngresado), RutFormat.DASH);
    }

    //console.log('RUT enviado al servicio:', rutIngresado);

    this.ingresoSolicitudService.getDatosContratante(rutIngresado).subscribe({
      next: (resp) => {
        if (resp.codigo === 200 && resp.data) {
          const datos = resp.data;

          if (datos.rutCliente !== '11898216-9') {
            this.notificacioAlertnService.error(
              'ERROR',
              'Este RUT no tiene datos disponibles'
            );
            this.nombreRazonSocial.set('');
            this.emailContratante.set('');
            this.telefonoContratante.set('');
            return;
          }

          this.nombreRazonSocial.set(
            `${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`
          );
          const correo =
            datos.emailParticularCliente ||
            datos.emailComercialCliente ||
            datos.emailEjecutivo ||
            '';
          const telefono =
            datos.celularParticularCliente ||
            datos.fonoParticularCliente ||
            datos.fonoComercialCliente ||
            datos.telefono ||
            '';
          this.emailContratante.set(correo);
          this.telefonoContratante.set(telefono);

          this.contratanteInfo.set({
            id: 0,
            rut_contratante: datos.rutCliente,
            nombre: `${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`,
            idRubro: 0,
            idSeguro: 0,
          });
        } else {
          this.notificacioAlertnService.error(
            'ERROR',
            'No se encontraron datos para el RUT ingresado'
          );
        }
      },
      error: () => {
        this.notificacioAlertnService.error(
          'ERROR',
          'Error al consultar el servicio'
        );
      },
    });
  }

  grabaContratanteAux() {}

  async grabaContratante() {
    /* console.log('form contratante:', this.agregaSolicitudContratante().value);
    console.log(
      'aseguradeCheck:',
      this.agregaSolicitudContratante().get('aseguradeCheck')!.value
    ); */
    this.ingresoSolicitud = {
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? "",
      contratante: {
        rut_contratante:
          this.agregaSolicitudContratante().get('rutCliente')!.value,
        nombre_razon_social_contratante: this.nombreRazonSocial(),
        mail_contratante: this.emailContratante(),
        telefono_contratante: this.telefonoContratante(),
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
    };
    this.ingresoSolicitudService
      .postIngresoSolicitud(this.ingresoSolicitud)
      .subscribe({
        next: (dato) => {
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
              this.idSolicitud = dato.p_id_solicitud;
              //this.idSolicitud.set(dato.p_id_solicitud);
            }
            //this.idSolicitud.set(dato.p_id_solicitud);
            this.idSolicitud = dato.p_id_solicitud;
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR', 'No fue posible crear la solicitud.');
        },
      });
  }

  valorAsegurado(dato: boolean) {
       this.agregaAsegurado().get('flagAsegurado')?.setValue(dato)
  }

  async agregarAsegurado() {
    const rutVisual = this.ingresoSolicitud.contratante.rut_contratante;

    const rutParaBD = formatRut(cleanRut(rutVisual), RutFormat.DASH);

    this.asegurado = {
      p_id_solicitud: Number(this.contratanteInfo().id),
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? "",
      p_rut_asegurado: rutParaBD,
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
    };

    await this.aseguradoService.postAgregaAsegurado(this.asegurado).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          //this.idSolicitud.set(this.contratanteInfo().id);
          this.idSolicitud = this.contratanteInfo().id;
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible agregar al asegurado.');
      },
    });
  }

  async onBlurRutCliente(event: Event) {
    const input = event.target as HTMLInputElement;
    const rut = input.value;

    if (validateRut(rut) === true) {
      await this.agregaSolicitudContratante()
        .get('rutCliente')!
        .setValue(formatRut(rut, RutFormat.DOTS_DASH));
      await this.nombreRazonSocial.set('Nombre de Prueba');
    }
  }

  validaRut(control: FormControl): { [s: string]: boolean } | null {
    if (validateRut(control.value) === false) {
      return { rutInvalido: true };
    }
    return null;

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
      this.notificacioAlertnService.info(
        'INGRESO SOLICITUD',
        'Acceso denegado'
      );
      setTimeout(() => {
        stepper.selectedIndex = pasoActual;
      });
      return;
    }
  }

  async enviarCoordinador(): Promise<void> {
    const request = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? ""
    };

    const enviada = await this.notificacioAlertnService.confirmacionSelectiva(
      'Enviar solicitud a Coordinador',
      'La solicitud nro. '+ this.idSolicitud +' será enviada al coordinador. \n\n'+
      'Una vez enviada, puedes seguir su estado \n '+
      'desde el Menú de Gestión de Cotizaciones. \n' +
      'El coordinador responsable será notificado y revisará \n '+
      'que la información esté completa y correcta. \n\n ¿Deseas continuar?',
      'Enviar solicitud', 'Cancelar'
    );

    if(enviada)
    {
      this.solicitudService.postEnviaSolicitud(request).subscribe({
        next: async (dato) => {
          if (dato.codigo === 200) {
            await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
              "La solicitud ha sido enviada exitosamente.");
            this.salir();
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','No fue posible enviar la solicitud al coordinador.');
        },
      });
    }
  }

  salir() {
    this.router.navigate(['inicio']);
  }

  get mostrarDatosAsegurado(): boolean {
    return !this.esIgualAlAsegurado;
  }
}
