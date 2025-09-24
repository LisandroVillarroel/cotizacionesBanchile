import { Component, ViewChild, inject, signal, NgModule, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from '@angular/material/card';

//import { ISolicitud, ITipoRubro, ITipoSeguro } from '@shared/modelo/common';

import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { RubroService } from '@shared/service/rubro.service';
import { IRubro } from '@shared/modelo/rubro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { IListadoSolicitudes } from '../datosSolicitud-Interface';
import { IEstado } from './modelo/common';

@Component({
  selector: 'app-solicitudes-gestionadas',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    CommonModule,

  ],
  templateUrl: './solicitudes-gestionadas.component.html',
  styleUrl: './solicitudes-gestionadas.component.css'
})

export class SolicitudesGestionadasComponent  {
  datosSolicitud =  input.required<IListadoSolicitudes[] | undefined>();
  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
 //estadoService = inject(EstadoService);

 datoRubros = signal<IRubro[]>([]);
 rescatadoSeguro = signal<ITipoSeguro[]>([]);
 datosEstados = signal<IEstado[]>([]);

  panelOpenState = false;
  rubro = new FormControl();
  seguro = new FormControl();
  estado = new FormControl();
  displayedColumns: string[] = [
    'index',
    'ID',
    'Fecha',
    'Contratante',
    'Rubro',
    "TipoSeguro",
    "Estado",
    "accion"
  ];

    constructor() {
        effect(() => {
          this.dataSourceSolicitud.data = this.datosSolicitud()!;

        })
      }

  dataSourceSolicitud = new MatTableDataSource<IListadoSolicitudes>();

   @ViewChild('inContratante') inputElement: any;

   @ViewChild(MatPaginator)
    paginatorSolicitud!: MatPaginator;
    @ViewChild(MatSort) sortSolicitud!: MatSort;

  ngAfterViewInit(): void {
    this.dataSourceSolicitud.paginator = this.paginatorSolicitud;
    this.dataSourceSolicitud.sort = this.sortSolicitud;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  applyFilterSolicitud(campo:string, valor: String) {
  //  const filterValue = (valor.target as HTMLInputElement).value;
     //console.log('campo:',campo  + ' Valor Inicial:',valor)
     this.dataSourceSolicitud.filterPredicate = (data: any, filter: string) => {
    // Comprueba si el valor de la columna específica incluye el filtro
    const dataValue = data[campo] ? data[campo].toString() : '';
    return dataValue.toLowerCase().includes(filter.toLowerCase());
  };

    this.dataSourceSolicitud.filter = valor.trim().toLowerCase();

    if (this.dataSourceSolicitud.paginator) {
      this.dataSourceSolicitud.paginator.firstPage();
    }
  }

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.estado.reset();

    this.dataSourceSolicitud.data = this.datosSolicitud()!;
  }
  buscar() {
    this.dataSourceSolicitud.data = this.datosSolicitud()!;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceSolicitud.data = this.datosSolicitud()!;
    this.cargaRubros();
    this.cargaEstados();
  }

  cargaRubros() {
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

   /* cargaEstados() {
    this.estadoService.postEstado().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
           this.datosEstados.set(dato.items);
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
  } */
  cargaEstados() {
    this.datosEstados = signal<IEstado[]>([
    {
      codigoEstado: 1,
      descripcionEstado: 'En edición',
    },
    {
      codigoEstado: 2,
      descripcionEstado: 'Devuelta',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'En revisión',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Aprobada',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Anulada',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'En cotización',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Propuesta pendiente',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Propuesta emitida',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Terminada',
    },
    {
      codigoEstado: 3,
      descripcionEstado: 'Rechazada',
    },
  ]);

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

  getCellClass(value: string): string {
    if(value=='En edición'){
      return 'edicion' ;
    }else if (value == 'En revisión') {
      return 'revision';
    } else if(value=='Aprobada'){
      return 'aprobada';
    }else if(value=='En cotización'){
      return 'cotizacion';
    }else if(value=='Propuesta pendiente'){
      return 'pendiente';
    }else if(value=='Propuesta emitida'){
      return 'emitida';
    }else if(value=='Terminada'){
      return 'terminada';
    }else if(value=='Devuelta'){
      return 'observ';
    }else if(value=='Anulada'){
      return 'anulada';
    // }else if(value=='Rechazada'){
    }else{
        return 'rechazada';
    }
  }

/* Llamadas a servicios */
/*
  datosSolicitud = signal<IListadoSolicitudes[]>([
    {
      ID: 24592,
      Fecha: '15/03/2023',
      Contratante: "Nombre Comercial S.A. 1",
      id_rubro: 1,
      desc_rubro: 'Vehículo',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Vehículo Liviano",
      Coordinador: "Camila Soto",
      Estado: "En edición"
    },
    {
      ID: 98129,
      Fecha: '22/07/2023',
      Contratante: "Nombre Comercial S.A. 2",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Asistencia en Viajes",
      Coordinador: "Andrés Salgado Pérez",
      Estado: "Anulada"
    },
    {
      ID: 33784,
      Fecha: '30/09/2023',
      Contratante: "Nombre Comercial S.A. 3",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Responsabilidad Civil Médica",
      Coordinador: "Valentina Díaz Ríos",
      Estado: "Con observaciones"
    },
    {
      ID: 67347,
      Fecha: '05/12/2023',
      Contratante: "Nombre Comercial S.A. 4",
      id_rubro: 1,
      desc_rubro: 'Vehículo',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Transporte Terrestre",
      Coordinador: "Joaquín Torres Martínez",
      Estado: "Aprobada"
    },
    {
      ID: 12915,
      Fecha: '18/02/2023',
      Contratante: "Nombre Comercial S.A. 5",
      id_rubro: 3,
      desc_rubro: 'Crédito',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Seguro de Crédito Interno",
      Coordinador: "Renata Castro Vergara",
      Estado: "Rechazada"
    },
    {
      ID: 55268,
      Fecha: '27/04/2023',
      Contratante: "Nombre Comercial S.A. 6",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 3,
      desc_tipoSeguro: "Asiento Pasajero/Vida Conductor",
      Coordinador: "Felipe Hernández García",
      Estado: "Propuesta emitida"
    },
    {
      ID: 24592,
      Fecha: '11/06/2023',
      Contratante: "Nombre Comercial S.A. 7",
      id_rubro: 4,
      desc_rubro: 'Inmuebles',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Todo Seguro y Construcción",
      Coordinador: "Francisco González",
      Estado: "En revisión"
    },
    {
      ID: 98130,
      Fecha: '23/08/2023',
      Contratante: "Nombre Comercial S.A. 8",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 3,
      desc_tipoSeguro: "Comunidad",
      Coordinador: "María José Pérez Martínez",
      Estado: "En cotización"
    },
    {
      ID: 33785,
      Fecha: '14/10/2023',
      Contratante: "Nombre Comercial S.A. 9",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 4,
      desc_tipoSeguro: "Incendio",
      Coordinador: "Sofía Ramírez",
      Estado: "Propuesta pendiente"
    },
    {
      ID: 67348,
      Fecha: '29/11/2023',
      Contratante: "Nombre Comercial S.A. 10",
      id_rubro: 3,
      desc_rubro: 'Crédito',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Seguro Crédito PY",
      Coordinador: "Cristóbal Fernández López",
      Estado: "Aprobada"
    },

        {
      ID: 24592,
      Fecha: '15/03/2023',
      Contratante: "Nombre Comercial S.A. 1",
      id_rubro: 1,
      desc_rubro: 'Vehículo',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Vehículo Liviano",
      Coordinador: "Camila Soto",
      Estado: "En edición"
    },
    {
      ID: 98129,
      Fecha: '22/07/2023',
      Contratante: "Nombre Comercial S.A. 2",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Asistencia en Viajes",
      Coordinador: "Andrés Salgado Pérez",
      Estado: "En revisión"
    },
    {
      ID: 33784,
      Fecha: '30/09/2023',
      Contratante: "Nombre Comercial S.A. 3",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Responsabilidad Civil Médica",
      Coordinador: "Valentina Díaz Ríos",
      Estado: "Con observaciones"
    },
    {
      ID: 67347,
      Fecha: '05/12/2023',
      Contratante: "Nombre Comercial S.A. 4",
      id_rubro: 1,
      desc_rubro: 'Vehículo',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Transporte Terrestre",
      Coordinador: "Joaquín Torres Martínez",
      Estado: "Aprobada"
    },
    {
      ID: 12915,
      Fecha: '18/02/2023',
      Contratante: "Nombre Comercial S.A. 5",
      id_rubro: 3,
      desc_rubro: 'Crédito',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Seguro de Crédito Interno",
      Coordinador: "Renata Castro Vergara",
      Estado: "Rechazada"
    },
    {
      ID: 55268,
      Fecha: '27/04/2023',
      Contratante: "Nombre Comercial S.A. 6",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 5,
      desc_tipoSeguro: "Asiento Pasajero/Vida Conductor",
      Coordinador: "Felipe Hernández García",
      Estado: "Propuesta emitida"
    },
    {
      ID: 24592,
      Fecha: '11/06/2023',
      Contratante: "Nombre Comercial S.A. 7",
      id_rubro: 4,
      desc_rubro: 'Inmuebles',
      id_tipo_seguro: 1,
      desc_tipoSeguro: "Todo Seguro y Construcción",
      Coordinador: "Francisco González",
      Estado: "En revisión"
    },
    {
      ID: 98130,
      Fecha: '23/08/2023',
      Contratante: "Nombre Comercial S.A. 8",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 3,
      desc_tipoSeguro: "Comunidad",
      Coordinador: "María José Pérez Martínez",
      Estado: "En cotización"
    },
    {
      ID: 33785,
      Fecha: '14/10/2023',
      Contratante: "Nombre Comercial S.A. 9",
      id_rubro: 2,
      desc_rubro: 'Vida',
      id_tipo_seguro: 4,
      desc_tipoSeguro: "Incendio",
      Coordinador: "Sofía Ramírez",
      Estado: "Con observaciones"
    },
    {
      ID: 67348,
      Fecha: '29/11/2023',
      Contratante: "Nombre Comercial S.A. 10",
      id_rubro: 3,
      desc_rubro: 'Crédito',
      id_tipo_seguro: 2,
      desc_tipoSeguro: "Seguro Crédito PY",
      Coordinador: "Cristóbal Fernández López",
      Estado: "Aprobada"
    },
  ]);
  */
/*
  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Rubro 1',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Rubro 2',
    },
    {
      codigoRubro: 3,
      descripcionRubro: 'Vehículo',
    },
  ]);

  DatoSeguros = signal<ITipoSeguro[]>([
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Seguro 1 Rubro 1',
      codigoRubro:1
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'Seguro 2 Rubro 1',
      codigoRubro:1
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Seguro 3 Rubro 1',
      codigoRubro:1
    },
    {
      codigoSeguro: 4,
      descripcionSeguro: 'Seguro 4 Rubro 1',
      codigoRubro:1
    },
    {
      codigoSeguro: 5,
      descripcionSeguro: 'Seguro 1 Rubro 2',
      codigoRubro:2
    },
    {
      codigoSeguro: 6,
      descripcionSeguro: 'Seguro 2 Rubro 2',
      codigoRubro:2
    },
    {
      codigoSeguro: 7,
      descripcionSeguro: 'Seguro 3 Rubro 2',
      codigoRubro:2
    },
    {
      codigoSeguro: 8,
      descripcionSeguro: 'Seguro 4 Rubro 2',
      codigoRubro:2
    },
     {
      codigoSeguro: 9,
      descripcionSeguro: 'Vehículo Liviano',
      codigoRubro:3
    },
    {
      codigoSeguro: 10,
      descripcionSeguro: 'Vehiculo prueba',
      codigoRubro:3
    },
  ]);
*/

  /* Fin llamadas a servicios */
     verDetalle(IdSolicitud: number) {
       const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '70%';
          dialogConfig.height = '90%';
          dialogConfig.position = { top: '3%' };
          dialogConfig.data = IdSolicitud;
          this.dialog
            .open(DetalleSolicitudComponent, dialogConfig)
            .afterClosed()
        }
}
