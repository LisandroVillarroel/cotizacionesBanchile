import { Component, ViewEncapsulation, inject, signal, ViewChild } from '@angular/core';
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
} from './modelo/ingresoSolicitud-Interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, NavigationEnd } from '@angular/router';
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
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatTableExporterModule,
    MatTooltipModule,
    FormsModule,
    AseguradoComponent,
    BeneficiarioComponent,
    CuestionarioComponent,
    MateriaAseguradaComponent,
    MatCardContent,
    MatCard,
    MatCheckboxModule
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
  datoSolicitud: ISolicitudContratante | undefined;
  nombreRazonSocial = signal<string>('');

  flagAseguradoRescata: boolean = false;
  flagBeneficiarioRescata: boolean = false;

  datoAsegurados=signal<ISolicitudAsegurado[] | undefined>(undefined);
  datoBeneficiarios=signal<ISolicitudBeneficiario[] | undefined>(undefined);

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);


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
      aseguradeCheck: this.aseguradeCheck

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


  async ngOnInit(){

      this.cargaRubro();
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
    const estructura_codigoRubro = {id_rubro:_codigoRubro} ;
   this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
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
    alert('Grabar');
  }

  salir() {
    this.router.navigate(['/principal/inicio']);
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

  get mostrarDatosAsegurado(): boolean {
    return !this.esIgualAlAsegurado;
  }

  cambioAseguradoFlag() {
    console.log('ver flag', this.flagAseguradoRescata);
    this.flagAsegurado.setValue(this.flagAseguradoRescata);
  }

  actualizarAsegurado(nuevoAsegurados: ISolicitudAsegurado[]) {
    this.datoAsegurados.set(nuevoAsegurados); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:', this.datoAsegurados());
  }

  cambioBeneficiarioFlag() {
    console.log('ver flag', this.flagAseguradoRescata);
    this.flagBeneficiario.setValue(this.flagBeneficiarioRescata);
  }

  actualizarBeneficiario(nuevoBeneficiarios: ISolicitudBeneficiario[]) {
    this.datoBeneficiarios.set(nuevoBeneficiarios); // Actualiza la señal del padre con el arreglo recibido del hijo
    console.log('arreglo actualizado:', this.datoBeneficiarios());
  }
}
