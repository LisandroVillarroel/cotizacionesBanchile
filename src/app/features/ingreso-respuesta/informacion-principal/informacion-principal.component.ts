import { Component, signal, ElementRef, inject, ViewChild, input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelect } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { TipoCuentaService } from './../../../shared/service/tipo-cuenta.service';
import { MedioPagoService } from './../../../shared/service/medio-pago.service';
import { BancoService } from '@shared/service/banco.service';
import { MonedaService } from '@shared/service/moneda.service';
import { RegistrarRespuestaService } from '@shared/service/registrar-respuesta.service';

import { IMoneda } from '@shared/modelo/moneda-interface';
import { IMedioPago } from '@shared/modelo/medio-pago-interface';
import { IBanco } from '@shared/modelo/banco-interface';
import { ITipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import { IDatosArchivo } from '@shared/modelo/archivos-interface';
import { IRegistrarRespuesta } from '@shared/modelo/registrar-respuesta-interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { ICompania } from '@features/detalle-solicitud/modelo/detalle-interface';

@Component({
  selector: 'app-informacion-principal',
  standalone: true,
  imports: [
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
    MatDatepicker,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './informacion-principal.component.html',
  styleUrl: './informacion-principal.component.css'
})

export default class InformacionPrincipalComponent {
  solicitudId = input.required<number | undefined>();
  compania = input.required<ICompania | undefined>();
  flagAccion = input.required<boolean | undefined>();

  moneda = new FormControl();
  primaNeta = new FormControl();
  primaAfecta = new FormControl();
  primaBruta = new FormControl();
  mPago = new FormControl();
  banco = new FormControl();
  tipoCuenta = new FormControl();
  nroCuenta = new FormControl();
  nroCuotas = new FormControl();
  fechaActual = new FormControl<Date>(new Date());
  pInicio = new FormControl<Date>(new Date());
  pTermino = new FormControl<Date>(new Date());
  pVencimiento = new FormControl<Date>(new Date());

  formRespuesta = signal<FormGroup>(new FormGroup({
    moneda : this.moneda,
    primaNeta : this.primaNeta,
    primaAfecta : this.primaAfecta,
    primaBruta : this.primaBruta,
    mPago : this.mPago,
    banco: this.banco,
    tipoCuenta: this.tipoCuenta,
    nroCuenta: this.nroCuenta,
    nroCuotas: this.nroCuotas,
    fechaActual: this.fechaActual,
    pInicio: this.pInicio,
    pTermino: this.pTermino,
    pVencimiento: this.pVencimiento
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

  fechaInicio: Date | null = null;
  fechaTermino: Date | null = null;
  fechaVencimiento: Date | null = null;

  @ViewChild('fileInputPropuesta') fileInputPropuesta!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputCompania') fileInputCompania!: ElementRef<HTMLInputElement>;

  selectedPropuestaFile: File | null = null;
  selectedCompaniaFile: File | null = null;
  archivoCompania: File | null = null;
  archivoPropuesta: File | null = null;

  nombreArchivoPropuesta: string = '';
  nombreArchivoCompania: string = '';

  constructor(
    private registrarRespuestaService: RegistrarRespuestaService
  ) { }

  cargaMoneda() {
    this.monedaService.postMoneda().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosMoneda.set(dato.p_cursor);
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
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
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
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
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
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
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  async ngOnInit() {
    this.cargaMoneda();
    this.cargaMedioPago();
    this.cargaBanco();
    this.cargaTipoCuenta();
  }

  filtrarFechasTermino = (fecha: Date | null): boolean => {
    if (!fecha || !this.fechaInicio) {
      return false;
    }
    return fecha >= this.fechaInicio;
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
      p_id_solicitud: this.solicitudId()!,
      p_id_compania_seguro: this.compania()?.p_id_compania_seguro!,//
      p_id_moneda: this.formRespuesta().get('moneda')!.value,
      p_valor_prima_neta: this.formRespuesta().get('primaNeta')!.value,
      p_valor_prima_afecta: this.formRespuesta().get('primaAfecta')!.value,
      p_valor_prima_bruta: this.formRespuesta().get('primaBruta')!.value,
      p_id_medio_de_pago: this.formRespuesta().get('mPago')!.value,
      p_id_banco: this.formRespuesta().get('banco')!.value,
      p_id_tipo_cuenta: this.formRespuesta().get('tipoCuenta')!.value,
      p_nro_cuenta: this.formRespuesta().get('nroCuenta')!.value,
      p_cantidad_cuotas: this.formRespuesta().get('nroCuotas')!.value,
      p_fecha_inicio_vigencia: this.formatFecha(this.formRespuesta().get('pInicio')!.value),
      p_fecha_termino_vigencia: this.formatFecha(this.formRespuesta().get('pTermino')!.value),
      p_dia_vencimiento_primera_cuota: this.formatFecha(this.formRespuesta().get('pVencimiento')!.value),
      p_id_cotizacion_compania: this.nombreArchivoCompania,
      p_ruta_cotizacion_compania: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_CIAS",//
      p_id_cotizacion_propuesta: this.nombreArchivoPropuesta,
      p_ruta_cotizacion_propuesta: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_PPTAS",//

      //archivoCompania: this.selectedCompaniaFile,
      //archivoPropuesta: this.selectedPropuestaFile,

      p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!
    };
    console.log("Respuesta: ", datos);
    this.registrarRespuestaService.registrarRespuesta(datos).subscribe({
      next: async (res) => {
        if (res.codigo === 200) {
          const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
            "La respuesta se ha registrado exitosamente.");
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
      },
    });
  }

  formatFecha(fecha: Date | null): string {
    if (!fecha) return '';
    const iso = new Date(fecha).toISOString();
    return iso.split('T')[0]; // Devuelve formato YYYY-MM-DD
  }

  getErrorMessage(campo: string){
    if (campo === 'moneda') {
      return this.moneda.hasError('required') ? 'Debe seleccionar una moneda' : '';
    }
    if (campo === 'mPago') {
      return this.moneda.hasError('required') ? 'Debe seleccionar un medio de pago' : '';
    }
    if (campo === 'banco') {
      return this.moneda.hasError('required') ? 'Debe seleccionar un banco' : '';
    }
    if (campo === 'tipoCuenta') {
      return this.moneda.hasError('required') ? 'Debe seleccionar un tipo de cuenta' : '';
    }
    if (campo === 'nroCuotas') {
      return this.moneda.hasError('required') ? 'Debe seleccionar un nro. de cuotas' : '';
    }
    if (campo === 'primaNeta') {
      return this.moneda.hasError('required') ? 'Debe indicar la prima neta' : '';
    }
    if (campo === 'primaAfecta') {
      return this.moneda.hasError('required') ? 'Debe indicar la prima afecta' : '';
    }
    if (campo === 'primaBruta') {
      return this.moneda.hasError('required') ? 'Debe indicar la prima bruta' : '';
    }
    if (campo === 'nroCuenta') {
      return this.moneda.hasError('required') ? 'Debe indicar el nro. de cuenta' : '';
    }
    if (campo === 'pInicio') {
      return this.moneda.hasError('required') ? 'Debe indicar la fecha de inicio' : '';
    }
    return '';
  }
}
