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
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
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
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { ITipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { IDatosArchivo } from '@shared/modelo/archivos-interface';


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
    MatDivider,
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
  fechaActual = new FormControl<Date>(new Date());

  monedaService = inject(MonedaService);
  medioPagoService = inject(MedioPagoService);
  bancoService = inject(BancoService);
  tipoCuentaService = inject(TipoCuentaService);

  datosMoneda = signal<IMoneda[]>([]);
  datosMedioPago = signal<IMedioPago[]>([]);
  datosBanco = signal<IBanco[]>([]);
  datosTipoCuenta = signal<ITipoCuenta[]>([]);

  panelOpenState = false;
  moneda = new FormControl();
  mPago = new FormControl();
  banco = new FormControl();
  tipoCuenta = new FormControl();

  constructor() {

  }


  cargaMoneda() {
    //console.log('Entro cargaRubros');

    this.monedaService.postMoneda().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosMoneda.set(dato.p_cursor);
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

  cargaMedioPago() {
    //console.log('Entro cargaRubros');

    this.medioPagoService.postMedioPago().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosMedioPago.set(dato.p_cursor);
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

  cargaBanco() {
    //console.log('Entro cargaRubros');

    this.bancoService.postBanco().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosBanco.set(dato.p_cursor);
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

  cargaTipoCuenta() {
    //console.log('Entro cargaRubros');

    this.tipoCuentaService.postTipoCuenta().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosTipoCuenta.set(dato.p_cursor);
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


  async ngOnInit() {
    this.cargaMoneda();
    this.cargaMedioPago();
    this.cargaBanco();
    this.cargaTipoCuenta();
  }


fechaInicio: Date | null = null;
fechaTermino: Date | null = null;
fechaVencimiento: Date | null = null;

filtrarFechasTermino = (fecha: Date | null): boolean => {
  if (!fecha || !this.fechaInicio) {
    return false; // Bloquea todo si no hay fechaInicio
  }
  return fecha >= this.fechaInicio;
};

soloNumeros(event: KeyboardEvent) {
  const charCode = event.key;
  if (!/^\d$/.test(charCode)) {
    event.preventDefault();
  }
}




  @ViewChild('fileInputPropuesta') fileInputPropuesta!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputCompania') fileInputCompania!: ElementRef<HTMLInputElement>;

  nombreArchivoPropuesta: string = '';
  archivoPropuesta: File | null = null;

  nombreArchivoCompania: string = '';
  archivoCompania: File | null = null;


  archivoUrl = signal<string | null>(null);
  datosArchivo = signal<IDatosArchivo | null>(null);


  abrirSelectorPropuesta(): void {
    this.fileInputPropuesta.nativeElement.click();
  }

  abrirSelectorCompania(): void {
    this.fileInputCompania.nativeElement.click();
  }

  // onFileSelectedPropuesta(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.archivoPropuesta = input.files[0];
  //     this.nombreArchivoPropuesta = this.archivoPropuesta.name;

  //     console.log('Archivo seleccionado:', this.archivoPropuesta);
  //   } else {
  //     console.warn('No se seleccionó ningún archivo');
  //   }
  // }



// async onFileSelectedPropuesta(event: any) {
//     this.fileSeleccionado = event.target.files[0];
//     const file: File = event.target.files[0];
//     this.imageUrl = signal(null);
//     if (file) {
//       this.datosFoto = signal<IDatosFile>({
//         nombre: file.name,
//         tipo: file.type,
//         size: Math.ceil(file.size / 1024), // tamaño en KB
//         extension: file.name.split('.').pop() || '',
//       });
//       console.log('Archivo seleccionado:', file);

//       const reader = new FileReader();
//       console.log('paso1');
//       reader.onload = (e) => {
//         this.imageUrl.set(e.target?.result as string);
//       };
//       console.log('paso3');
//       reader.readAsDataURL(file);
//       console.log('paso4');
//     }
//     // Aquí puedes agregar la lógica para subir el archivo al servidor o procesarlo según tus necesidades.
//   }



async onFileSelectedPropuesta(event: any) {
  this.archivoPropuesta = event.target.files[0];
  const file: File = event.target.files[0];
  this.archivoUrl = signal(null);
  if (file) {
    this.nombreArchivoPropuesta = file.name;
    this.datosArchivo = signal<IDatosArchivo>({
      nombre: file.name,
      tipo: file.type,
      size: Math.ceil(file.size / 1024), // tamaño en KB
      extension: file.name.split('.').pop() || '',
    });
    console.log('Archivo seleccionado:', file);
    const reader = new FileReader();
    console.log('paso1');
    reader.onload = (e) => {
      this.archivoUrl.set(e.target?.result as string);
    };
    console.log('paso3');
    reader.readAsDataURL(file);
    console.log('paso4');
  }
}

async onFileSelectedCompania(event: any) {
  this.archivoCompania = event.target.files[0];
  const file: File = event.target.files[0];
  this.archivoUrl = signal(null);
  if (file) {
    this.nombreArchivoCompania = file.name;
    this.datosArchivo = signal<IDatosArchivo>({
      nombre: file.name,
      tipo: file.type,
      size: Math.ceil(file.size / 1024), // tamaño en KB
      extension: file.name.split('.').pop() || '',
    });
    console.log('Archivo seleccionado:', file);
    const reader = new FileReader();
    console.log('paso1');
    reader.onload = (e) => {
      this.archivoUrl.set(e.target?.result as string);
    };
    console.log('paso3');
    reader.readAsDataURL(file);
    console.log('paso4');
  }
}





















  // onFileSelectedCompania(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.archivoCompania = input.files[0];
  //     this.nombreArchivoCompania = this.archivoCompania.name;

  //     console.log('Archivo seleccionado:', this.archivoCompania);
  //   } else {
  //     console.warn('No se seleccionó ningún archivo');
  //   }
  // }

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
