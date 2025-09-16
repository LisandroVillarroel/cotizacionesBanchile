import { Component, ViewChild, inject, signal, NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
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
  selector: 'app-nuevas',
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
  templateUrl: './nuevas.component.html',
  styleUrl: './nuevas.component.css'
})

export class NuevasComponent {
  panelOpenState = false;
  rescatadoSeguro=signal<ITipoSeguro[]>([]);
  rubro = new FormControl();
  seguro = new FormControl();
  nombre = new FormControl();
  dateControl = new FormControl();

  displayedColumns: string[] = [
    "Sla", "ID", "Rut", "Contratante", "Rubro", "TipoSeguro", "Fecha", "accion" ];

  dataSourceSolicitud = signal<ISolicitudG[]>([]);

  @ViewChild('buscarInput') inputElement: any;

  @ViewChild(MatPaginator)
  paginatorSolicitud!: MatPaginator;
  @ViewChild(MatSort) sortSolicitud!: MatSort;

  ngAfterViewInit(): void {
    // this.dataSourceSolicitud.paginator = this.paginatorSolicitud;
}

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

 /*  applyFilterSolicitud(campo:string, valor: String) {
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
 */

  async filtrarNombre(inNombre: string) {
    this.dataSourceSolicitud.set(await this.dataSourceSolicitud().filter((item) => item.Contratante == inNombre));
  }

  async seleccionaRubro(_codigoRubro: number) {
    this.rescatadoSeguro.set(await this.DatoSeguros()
    .filter((rubro) => rubro.codigoRubro == _codigoRubro));
    this.dataSourceSolicitud.set(await this.dataSourceSolicitud().filter((item) => item.IdRubro == _codigoRubro));
  }

  async filtrarTipoSeguro(inTipoSeguro: number) {
    this.dataSourceSolicitud.set(await this.dataSourceSolicitud().filter((item) => item.IdTipoSeguro == inTipoSeguro));
  }

  async filtrarFecha() {
    this.dataSourceSolicitud.set(await this.dataSourceSolicitud()
    .filter((item) => item.Fecha == this.dateControl.value.toString()));
  }

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.nombre.reset();
    this.dataSourceSolicitud.set(this.datosSolicitud);
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceSolicitud.set(this.datosSolicitud);
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
  datosSolicitud =<ISolicitudG[]>([
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
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
      Observaciones:[],
    },
  ]);

  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Crédito',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Inmuebles',
    },
    {
      codigoRubro: 3,
      descripcionRubro: 'Vehículo',
    },
    {
      codigoRubro: 4,
      descripcionRubro: 'Vida',
    },
  ]);

  DatoSeguros = signal<ITipoSeguro[]>([
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Seguro de Crédito Interno',
      codigoRubro: 1
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Todo Seguro y Construcción',
      codigoRubro: 2
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Vehículo liviano',
      codigoRubro: 3
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'Transporte terrestre',
      codigoRubro: 3
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Asistencia en viajes',
      codigoRubro: 4
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'Responsabilidad Civil Médica',
      codigoRubro: 4
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Asiento Pasajero/Vida Conductor',
      codigoRubro: 4
    },
  ]);

    verDetalle(ISolicitud: any) {
      throw new Error('Function not implemented.');
    }
}
