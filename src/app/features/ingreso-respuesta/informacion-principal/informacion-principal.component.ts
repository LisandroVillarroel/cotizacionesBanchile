import { TipoCuentaService } from './../../../shared/service/tipo-cuenta.service';
import { MedioPagoService } from './../../../shared/service/medio-pago.service';
import {
  Component,
  input,
  signal,
  ViewChildren,
  ElementRef,
  QueryList,
  inject,
  ViewChild,
  computed,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
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
import { MonedaService } from '@shared/service/moneda.service';
import { IMoneda } from '@shared/modelo/moneda-interface';
import { IMedioPago } from '@shared/modelo/medio-pago-interface';
import { BancoService } from '@shared/service/banco.service';
import { IBanco } from '@shared/modelo/banco-interface';
import { ITipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import { IDatosArchivo } from '@shared/modelo/archivos-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';


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

  monedaRes: string = '';
  primaNetaRes: string = '';
  primaAfectaRes: string = '';
  primaBrutaRes: string = '';
  mPagoRes: string = '';
  bancoRes: string = '';
  tipoCuentaRes: string = '';
  nroCuentaRes: string = '';
  nroCuotasRes: string = '';
  fchInicioRes: Date | null = null;
  fchTerminoRes: Date | null = null;
  fchVencimientoRes: Date | null = null;

  monedaService = inject(MonedaService);
  medioPagoService = inject(MedioPagoService);
  bancoService = inject(BancoService);
  tipoCuentaService = inject(TipoCuentaService);
  notificacioAlertnService = inject(NotificacioAlertnService);

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
}
