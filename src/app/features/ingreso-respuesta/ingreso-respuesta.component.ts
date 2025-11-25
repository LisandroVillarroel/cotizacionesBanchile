import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelect } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { IMoneda } from '@shared/modelo/moneda-interface';
import { IMedioPago } from '@shared/modelo/medio-pago-interface';
import { IBanco } from '@shared/modelo/banco-interface';
import { ITipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import { IDatosArchivo } from '@shared/modelo/archivos-interface';
import { IRegistrarRespuesta } from '@shared/modelo/registrar-respuesta-interface';
import { IModificarRespuesta } from '@shared/modelo/modificar-respuesta-interface';

import { InformacionGeneralComponent } from '@features/detalle-solicitud/informacion-general/informacion-general.component';
import ModalAseguradoComponent from './modal-asegurado/modal-asegurado.component';
import { ModalBeneficiarioComponent } from './modal-beneficiario/modal-beneficiario.component';
import CabeceraPopupComponente from '../../shared/ui/cabeceraPopup.component';

import { MonedaService } from '@shared/service/moneda.service';
import { MedioPagoService } from '@shared/service/medio-pago.service';
import { BancoService } from '@shared/service/banco.service';
import { TipoCuentaService } from '@shared/service/tipo-cuenta.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import { RegistrarRespuestaService } from '@shared/service/registrar-respuesta.service';
import { ModificarRespuestaService } from '@shared/service/modificar-respuesta.service';
import { IRespuesta } from '@features/gestion-cotizaciones/gestionCotizacion-interface';

@Component({
  selector: 'app-ingreso-respuesta',
  standalone: true,
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS)],
  imports: [
    InformacionGeneralComponent,
    CabeceraPopupComponente,
    MatDialogContent,
    MatCardHeader,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    MatCardModule,
    MatSelect,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './ingreso-respuesta.component.html',
})
export class IngresoRespuestaComponent {
  public readonly datos = inject<IRespuesta>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public readonly idSolicitud = this.datos.infoGral.id_solicitud;
  public readonly modoEdicion = !this.datos.flagAccion; // false = edición
  public titulo: string = '';

  verDetalleAse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.datos.infoGral.id_solicitud;
    this.dialog.open(ModalAseguradoComponent, dialogConfig).afterClosed();
  }

  verDetalleBen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.datos.infoGral.id_solicitud;
    this.dialog.open(ModalBeneficiarioComponent, dialogConfig).afterClosed();
  }

  moneda = new FormControl('', [Validators.required]);
  primaNeta = new FormControl('', [Validators.required]);
  primaAfecta = new FormControl('', [Validators.required]);
  primaBruta = new FormControl('', [Validators.required]);
  mPago = new FormControl('', [Validators.required]);
  banco = new FormControl('', [Validators.required]);
  tipoCuenta = new FormControl('', [Validators.required]);
  nroCuenta = new FormControl('', [Validators.required]);
  nroCuotas = new FormControl('', [Validators.required]);
  fechaActual = new FormControl<Date>(new Date(), [Validators.required]);
  pInicio = new FormControl<Date | null>(null, [Validators.required]);
  pTermino = new FormControl<Date | null>(null, [Validators.required]);
  pVencimiento = new FormControl<Date | null>(null, [Validators.required]);

  formRespuesta = signal<FormGroup>(
    new FormGroup({
      moneda: this.moneda,
      primaNeta: this.primaNeta,
      primaAfecta: this.primaAfecta,
      primaBruta: this.primaBruta,
      mPago: this.mPago,
      banco: this.banco,
      tipoCuenta: this.tipoCuenta,
      nroCuenta: this.nroCuenta,
      nroCuotas: this.nroCuotas,
      fechaActual: this.fechaActual,
      pInicio: this.pInicio,
      pTermino: this.pTermino,
      pVencimiento: this.pVencimiento,
    })
  );

  monedaService = inject(MonedaService);
  medioPagoService = inject(MedioPagoService);
  bancoService = inject(BancoService);
  tipoCuentaService = inject(TipoCuentaService);
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  datosMoneda = signal<IMoneda[]>([]);
  datosMedioPago = signal<IMedioPago[]>([]);
  datosBanco = signal<IBanco[]>([]);
  datosTipoCuenta = signal<ITipoCuenta[]>([]);
  archivoUrl = signal<string | null>(null);
  datosArchivo = signal<IDatosArchivo | null>(null);

  panelOpenState = false;

  fechaInicio = signal<Date | null>(null);
  fechaTermino: Date | null = null;
  fechaVencimiento: Date | null = null;

  @ViewChild('fileInputPropuesta')
  fileInputPropuesta!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputCompania')
  fileInputCompania!: ElementRef<HTMLInputElement>;

  selectedPropuestaFile: File | null = null;
  selectedCompaniaFile: File | null = null;
  archivoCompania: File | null = null;
  archivoPropuesta: File | null = null;

  nombreArchivoPropuesta: string = '';
  nombreArchivoCompania: string = '';
  habilitarModificar = false;
  tipoUsuario: string;

  constructor(
    private registrarRespuestaService: RegistrarRespuestaService,
    private modificarRespuestaService: ModificarRespuestaService,
    private dialogRef: MatDialogRef<IngresoRespuestaComponent>
  ) {
    const sesion = this._storage();
    this.tipoUsuario = sesion?.usuarioLogin.tipoUsuario!;
  }

  cargaMoneda() {
    this.monedaService.postMoneda().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosMoneda.set(dato.p_cursor);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible cargar las monedas.');
      },
    });
  }

  cargaMedioPago() {
    this.medioPagoService.postMedioPago().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosMedioPago.set(dato.p_cursor);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible cargar los medios de pago.');
      },
    });
  }

  cargaBanco() {
    this.bancoService.postBanco().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosBanco.set(dato.p_cursor);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible cargar los bancos.');
      },
    });
  }

  cargaTipoCuenta() {
    this.tipoCuentaService.postTipoCuenta().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosTipoCuenta.set(dato.p_cursor);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible cargar los tipos de cuenta.');
      },
    });
  }

  async ngOnInit() {
    // Deshabilitar pTermino y pVencimiento inicialmente
    if(this.datos.flagAccion){
      this.titulo ="Ingresar";
    } else {
      this.titulo = "Modificar";
    }
    this.pTermino.disable();
    this.pVencimiento.disable();

    // Suscribirse a cambios en pInicio
    this.pInicio.valueChanges.subscribe((value) => {
      if (value) {
        this.pTermino.enable();
        this.pVencimiento.enable();
      } else {
        this.pTermino.disable();
        this.pVencimiento.disable();
      }
    });

    // Cargar catálogos
    this.cargaMoneda();
    this.cargaMedioPago();
    this.cargaBanco();
    this.cargaTipoCuenta();

    // Prellenar formulario si está en modo edición
    if (!this.datos.flagAccion) {
      // flagAccion = false → modo modificar
      const respuesta = this.datos.compania;
      this.formRespuesta().patchValue({
        moneda: respuesta.p_id_moneda,
        primaNeta: respuesta.p_valor_prima_neta,
        primaAfecta: respuesta.p_valor_prima_afecta,
        primaBruta: respuesta.p_valor_prima_bruta,
        mPago: respuesta.p_id_medio_de_pago,
        banco: respuesta.p_id_banco,
        tipoCuenta: respuesta.p_id_tipo_cuenta,
        nroCuenta: respuesta.p_nro_cuenta,
        nroCuotas: respuesta.p_cantidad_cuotas,
        pInicio: new Date(respuesta.p_fecha_inicio_vigencia),
        pTermino: new Date(respuesta.p_fecha_termino_vigencia),
        pVencimiento: new Date(respuesta.p_dia_vencimiento_primera_cuota),
      });
    }

    // Detectar cambios para habilitar botón Modificar
    this.formRespuesta().valueChanges.subscribe(() => {
      if (!this.datos.flagAccion) {
        this.habilitarModificar = true;
      }
    });
  }

  filtrarFechasTermino = (fecha: Date | null): boolean => {
    if (!fecha || !this.fechaInicio()) {
      return false;
    }
    return fecha >= this.fechaInicio()!;
  };

  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key;
    if (!/^\d$/.test(charCode)) {
      event.preventDefault();
    }
  }

  abrirSelectorPropuesta(): void {
    this.fileInputPropuesta.nativeElement.click();
  }

  abrirSelectorCompania(): void {
    this.fileInputCompania.nativeElement.click();
  }

  onFileSelectedPropuesta(event: any) {
    const filePpta: File = event.target.files[0];
    if (filePpta) {
      this.selectedPropuestaFile = filePpta;
      this.nombreArchivoPropuesta = filePpta.name;
    }
  }

  onFileSelectedCompania(event: any) {
    const fileCia: File = event.target.files[0];
    if (fileCia) {
      this.selectedCompaniaFile = fileCia;
      this.nombreArchivoCompania = fileCia.name;
    }
  }

  eliminarArchivoPropuesta(): void {
    this.archivoPropuesta = null;
    this.nombreArchivoPropuesta = '';
    this.fileInputPropuesta.nativeElement.value = '';
  }

  eliminarArchivoCompania(): void {
    this.archivoCompania = null;
    this.nombreArchivoCompania = '';
    this.fileInputCompania.nativeElement.value = '';
  }

  registraRespuesta() {
    const datos: IRegistrarRespuesta = {
      p_id_solicitud: this.idSolicitud,
      p_id_compania_seguro: this.datos.compania?.p_id_compania_seguro!, //
      p_id_moneda: this.formRespuesta().get('moneda')!.value,
      p_valor_prima_neta: this.formRespuesta().get('primaNeta')!.value,
      p_valor_prima_afecta: this.formRespuesta().get('primaAfecta')!.value,
      p_valor_prima_bruta: this.formRespuesta().get('primaBruta')!.value,
      p_id_medio_de_pago: this.formRespuesta().get('mPago')!.value,
      p_id_banco: this.formRespuesta().get('banco')!.value,
      p_id_tipo_cuenta: this.formRespuesta().get('tipoCuenta')!.value,
      p_nro_cuenta: this.formRespuesta().get('nroCuenta')!.value,
      p_cantidad_cuotas: this.formRespuesta().get('nroCuotas')!.value,
      p_fecha_inicio_vigencia: this.formatFecha(
        this.formRespuesta().get('pInicio')!.value
      ),
      p_fecha_termino_vigencia: this.formatFecha(
        this.formRespuesta().get('pTermino')!.value
      ),
      p_dia_vencimiento_primera_cuota: this.formatFecha(
        this.formRespuesta().get('pVencimiento')!.value
      ),
      p_id_cotizacion_compania: this.nombreArchivoCompania,
      p_ruta_cotizacion_compania:
        'C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_CIAS', //
      p_id_cotizacion_propuesta: this.nombreArchivoPropuesta,
      p_ruta_cotizacion_propuesta:
        'C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_PPTAS', //

      //archivoCompania: this.selectedCompaniaFile,
      //archivoPropuesta: this.selectedPropuestaFile,

      p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
    };
    this.registrarRespuestaService.registrarRespuesta(datos).subscribe({
      next: async (res) => {
        if (res.codigo === 200) {
          const result = await this.notificacioAlertnService.confirmacion(
            'CONFIRMACIÓN',
            'La respuesta se ha registrado exitosamente.'
          );
          this.dialogRef.close(true);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  modificaRespuesta() {
    const datos: IModificarRespuesta = {
      p_id_usuario: String(this._storage()?.usuarioLogin.usuario!),
      p_tipo_usuario: String(this._storage()?.usuarioLogin.tipoUsuario!),
      p_id_solicitud: Number(this.idSolicitud),
      p_id_compania_seguro: Number(this.datos.compania?.p_id_compania_seguro),
      p_id_moneda: Number(this.formRespuesta().get('moneda')!.value),
      p_valor_prima_neta: Number(this.formRespuesta().get('primaNeta')!.value),
      p_valor_prima_afecta: Number(
        this.formRespuesta().get('primaAfecta')!.value
      ),
      p_valor_prima_bruta: Number(
        this.formRespuesta().get('primaBruta')!.value
      ),
      p_id_medio_de_pago: Number(this.formRespuesta().get('mPago')!.value),
      p_id_banco: Number(this.formRespuesta().get('banco')!.value),
      p_id_tipo_cuenta: Number(this.formRespuesta().get('tipoCuenta')!.value),
      p_nro_cuenta: String(this.formRespuesta().get('nroCuenta')!.value),
      p_cantidad_cuotas: Number(this.formRespuesta().get('nroCuotas')!.value),

      // Fechas en formato DD/MM/YYYY
      p_fecha_inicio_vigencia: this.formatFechaDDMMYYYY(
        this.formRespuesta().get('pInicio')!.value
      ),
      p_fecha_termino_vigencia: this.formatFechaDDMMYYYY(
        this.formRespuesta().get('pTermino')!.value
      ),
      p_dia_vencimiento_primera_cuota: this.formatFechaDDMMYYYY(
        this.formRespuesta().get('pVencimiento')!.value
      ),

      p_id_cotizacion_compania:
        this.datos.compania?.p_id_cotizacion_compania ?? '',
      p_ruta_cotizacion_compania: '/docs/cotizaciones/COT-2025-001-UPD5.pdf',
      p_id_cotizacion_propuesta:
        this.datos.compania?.p_id_cotizacion_propuesta ?? '',
      p_ruta_cotizacion_propuesta: '/docs/propuestas/PROP-2025-005-UPD.pdf',

      p_detalle_solicitud_cotizacion: 'Modificación realizada',
    };

    this.modificarRespuestaService.modificarRespuesta(datos).subscribe({
      next: async (res) => {
        if (res.codigo === 200) {
          await this.notificacioAlertnService.confirmacion(
            'CONFIRMACIÓN',
            'La respuesta se ha modificado exitosamente.'
          );
          this.dialogRef.close(true);
        }
      },
      error: (error) => {
        console.error('Error en modificarRespuesta:', error);
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  // Método para formato YYYY-MM-DD para registrar
  formatFecha(fecha: Date | null): string {
    if (!fecha) return '';
    const dateObj = fecha instanceof Date ? fecha : new Date(fecha);
    return dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  // Método para formato DD/MM/YYYY para modificar
  formatFechaDDMMYYYY(fecha: any): string {
    if (!fecha) return '';
    const dateObj = fecha instanceof Date ? fecha : new Date(fecha);
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const anio = dateObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  getErrorMessage(campo: string) {
    if (campo === 'moneda') {
      return this.moneda.hasError('required')
        ? 'Debe seleccionar una moneda'
        : '';
    }
    if (campo === 'mPago') {
      return this.moneda.hasError('required')
        ? 'Debe seleccionar un medio de pago'
        : '';
    }
    if (campo === 'banco') {
      return this.moneda.hasError('required')
        ? 'Debe seleccionar un banco'
        : '';
    }
    if (campo === 'tipoCuenta') {
      return this.moneda.hasError('required')
        ? 'Debe seleccionar un tipo de cuenta'
        : '';
    }
    if (campo === 'nroCuotas') {
      return this.moneda.hasError('required')
        ? 'Debe seleccionar un nro. de cuotas'
        : '';
    }
    if (campo === 'primaNeta') {
      return this.moneda.hasError('required')
        ? 'Debe indicar la prima neta'
        : '';
    }
    if (campo === 'primaAfecta') {
      return this.moneda.hasError('required')
        ? 'Debe indicar la prima afecta'
        : '';
    }
    if (campo === 'primaBruta') {
      return this.moneda.hasError('required')
        ? 'Debe indicar la prima bruta'
        : '';
    }
    if (campo === 'nroCuenta') {
      return this.moneda.hasError('required')
        ? 'Debe indicar el nro. de cuenta'
        : '';
    }
    if (campo === 'pInicio') {
      return this.moneda.hasError('required')
        ? 'Debe indicar la fecha de inicio'
        : '';
    }
    return '';
  }
}
