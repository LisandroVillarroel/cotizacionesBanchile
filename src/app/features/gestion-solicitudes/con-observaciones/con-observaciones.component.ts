import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, ViewChild, inject, signal, NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
//import { ISolicitud, ITipoRubro, ITipoSeguro } from '@shared/modelo/common';
import { ISolicitudG, ITipoRubro, ITipoSeguro } from '@features/gestion-solicitudes/modelo/common';


@Component({
  selector: 'app-con-observaciones',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    CommonModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './con-observaciones.component.html',
  styleUrl: './con-observaciones.component.css'
})
export class ConObservacionesComponent {
  panelOpenState = false;
  rescatadoSeguro=signal<ITipoSeguro[]>([]);
  rubro = new FormControl();
  seguro = new FormControl();
  estado = new FormControl();

  dataSourceSolicitud = new MatTableDataSource<ISolicitudG>();
  displayedColumns: string[] = ["Sla", "ID", "Rut", "Contratante", "Rubro", "TipoSeguro", "Fecha", "accion"];
  expandColumns: string[]= [...this.displayedColumns, 'expand'];
  expandedElement= signal<ISolicitudG[]>([]);


  @ViewChild('buscarInput') inputElement: any;

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
    console.log('campo:',campo  + ' Valor Inicial:',valor)
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

  applyFilterIDNombre(campo:string, valor: String) {
  //  const filterValue = (valor.target as HTMLInputElement).value;
    console.log('campo:',campo  + ' Valor Inicial:',valor)
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
    this.dataSourceSolicitud.data = this.datosSolicitud();
  }

  buscar() {
    this.dataSourceSolicitud.data = this.datosSolicitud();
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceSolicitud.data = this.datosSolicitud();
  }

  async seleccionaRubro(_codigoRubro: number) {
    this.rescatadoSeguro.set(await this.DatoSeguros()
    .filter((rubro) => rubro.codigoRubro == _codigoRubro));
  }

  getCellClass(value: number): string {
    if(value <= 1){
      return 'verde' ;
    }else if (value <= 2) {
      return 'amarillo';
    }else{
        return 'rojo';
    }
  }

/* Llamadas a servicios */
  datosSolicitud = signal<ISolicitudG[]>([
    {
      Sla: 1,
      ID: "COT-1243123",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 1",
      IdRubro: 3,
      Rubro: 'Vehículo',
      IdTipoSeguro: 1,
      TipoSeguro: "Vehículo Liviano",
      Fecha: '15/03/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 1,
      ID: "COT-1243125",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 2",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 1,
      TipoSeguro: "Asistencia en Viajes",
      Fecha: '22/07/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 2,
      ID: "COT-1245723",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 3",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 2,
      TipoSeguro: "Responsabilidad Civil Médica",
      Fecha: '30/09/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 2,
      ID: "COT-1257213",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 4",
      IdRubro: 3,
      Rubro: 'Vehículo',
      IdTipoSeguro: 2,
      TipoSeguro: "Transporte Terrestre",
      Fecha: '05/12/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 3,
        descripcionObs: "Descripción motivo devolución 3",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257216",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 5",
      IdRubro: 1,
      Rubro: 'Crédito',
      IdTipoSeguro: 1,
      TipoSeguro: "Seguro de Crédito Interno",
      Fecha: '18/02/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 3,
        descripcionObs: "Descripción motivo devolución 3",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257226",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 6",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 3,
      TipoSeguro: "Asiento Pasajero/Vida Conductor",
      Fecha: '27/04/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257227",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 7",
      IdRubro: 2,
      Rubro: 'Inmuebles',
      IdTipoSeguro: 1,
      TipoSeguro: "Todo Seguro y Construcción",
      Fecha: '11/06/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 1,
      ID: "COT-1243123",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 1",
      IdRubro: 3,
      Rubro: 'Vehículo',
      IdTipoSeguro: 1,
      TipoSeguro: "Vehículo Liviano",
      Fecha: '15/03/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 3,
        descripcionObs: "Descripción motivo devolución 3",
        fechaObs: "00-00-0000"
      }],},
    {
      Sla: 1,
      ID: "COT-1243125",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 2",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 1,
      TipoSeguro: "Asistencia en Viajes",
      Fecha: '22/07/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 2,
      ID: "COT-1245723",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 3",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 2,
      TipoSeguro: "Responsabilidad Civil Médica",
      Fecha: '30/09/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 2,
      ID: "COT-1257213",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 4",
      IdRubro: 3,
      Rubro: 'Vehículo',
      IdTipoSeguro: 2,
      TipoSeguro: "Transporte Terrestre",
      Fecha: '05/12/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257216",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 5",
      IdRubro: 1,
      Rubro: 'Crédito',
      IdTipoSeguro: 1,
      TipoSeguro: "Seguro de Crédito Interno",
      Fecha: '18/02/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257226",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 6",
      IdRubro: 4,
      Rubro: 'Vida',
      IdTipoSeguro: 3,
      TipoSeguro: "Asiento Pasajero/Vida Conductor",
      Fecha: '27/04/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      }],
    },
    {
      Sla: 3,
      ID: "COT-1257227",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 7",
      IdRubro: 2,
      Rubro: 'Inmuebles',
      IdTipoSeguro: 1,
      TipoSeguro: "Todo Seguro y Construcción",
      Fecha: '11/06/2023',
      Observaciones: [{
        iteracion: 1,
        descripcionObs: "Descripción motivo devolución 1",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 2,
        descripcionObs: "Descripción motivo devolución 2",
        fechaObs: "00-00-0000"
      },
      {
        iteracion: 3,
        descripcionObs: "Descripción motivo devolución 3",
        fechaObs: "00-00-0000"
      }],
    },
  ]);

  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Crédito',
    },
    {
      codigoRubro: 1,
      descripcionRubro: 'Inmuebles',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Vehículo',
    },
    {
      codigoRubro: 3,
      descripcionRubro: 'Vida',
    },
  ]);

  DatoSeguros = signal<ITipoSeguro[]>([
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Seguro de Crédito Interno',
      codigoRubro:1
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'Todo Seguro y Construcción',
      codigoRubro:1
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Vehículo liviano',
      codigoRubro:1
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Transporte terrestre',
      codigoRubro:2
    },
    {
      codigoSeguro: 4,
      descripcionSeguro: 'Asistencia en viajes',
      codigoRubro:1
    },
    {
      codigoSeguro: 4,
      descripcionSeguro: 'Responsabilidad Civil Médica',
      codigoRubro:2
    },
    {
      codigoSeguro: 4,
      descripcionSeguro: 'Asiento Pasajero/Vida Conductor',
      codigoRubro:3
    },
  ]);

    verDetalle(ISolicitud: any) {
      throw new Error('Function not implemented.');
    }
}
