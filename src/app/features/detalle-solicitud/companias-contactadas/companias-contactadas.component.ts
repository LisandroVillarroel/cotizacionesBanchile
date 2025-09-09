import { Component, ViewChild, inject, signal,} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

import { MatTooltip } from "@angular/material/tooltip";
import { ISolicitud, ITipoRubro, ITipoSeguro } from '@features/gestion-solicitudes/modelo/common';

@Component({
  selector: 'app-companias-contactadas',
  standalone: true,
  imports: [MatTableModule,
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
    MatTooltip],
  templateUrl: './companias-contactadas.component.html',
  styleUrl: './companias-contactadas.component.css'
})
export class CompaniasContactadasComponent {
rescatadoSeguro=signal<ITipoSeguro[]>([]);

  rubro = new FormControl();
  seguro = new FormControl();
  displayedColumns: string[] = [
    'index',
    'id',
    'fecha',
    'contratante',
    'rubro',
    "tipoSeguro",
    "coordinador",
    "estado",
    "accion"
  ];

  dataSourceSolicitud = new MatTableDataSource<ISolicitud>();

   @ViewChild(MatPaginator)
    paginatorSolicitud!: MatPaginator;
    @ViewChild(MatSort) sortSolicitud!: MatSort;

  ngAfterViewInit(): void {
    this.dataSourceSolicitud.paginator = this.paginatorSolicitud;
    this.dataSourceSolicitud.sort = this.sortSolicitud;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  applyFilterSolicitud(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSolicitud.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSolicitud.paginator) {
      this.dataSourceSolicitud.paginator.firstPage();
    }
  }

  limpiaFiltros() {
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

/* Llamadas a servicios */
  datosSolicitud = signal<ISolicitud[]>([
    {
      ID: 24592,
      Fecha: '15/03/2023',
      Contratante: "Nombre Comercial S.A. 1",
      Rubro: 'Vehículo',
      TipoSeguro: "Vehículo Liviano",
      Coordinador: "Camila Soto",
      Estado: "En edición"
    },
    {
      ID: 98129,
      Fecha: '22/07/2023',
      Contratante: "Nombre Comercial S.A. 2",
      Rubro: 'Vida',
      TipoSeguro: "Asistencia en Viajes",
      Coordinador: "Andrés Salgado Pérez",
      Estado: "En revisión"
    },
    {
      ID: 33784,
      Fecha: '30/09/2023',
      Contratante: "Nombre Comercial S.A. 3",
      Rubro: 'Vida',
      TipoSeguro: "Responsabilidad Civil Médica",
      Coordinador: "Valentina Díaz Ríos",
      Estado: "Con observaciones"
    },
    {
      ID: 67347,
      Fecha: '05/12/2023',
      Contratante: "Nombre Comercial S.A. 4",
      Rubro: 'Vehículo',
      TipoSeguro: "Transporte Terrestre",
      Coordinador: "Joaquín Torres Martínez",
      Estado: "Aprobada"
    },
    {
      ID: 12915,
      Fecha: '18/02/2023',
      Contratante: "Nombre Comercial S.A. 5",
      Rubro: 'Crédito',
      TipoSeguro: "Seguro de Crédito Interno",
      Coordinador: "Renata Castro Vergara",
      Estado: "Rechazada"
    },
    {
      ID: 55268,
      Fecha: '27/04/2023',
      Contratante: "Nombre Comercial S.A. 6",
      Rubro: 'Vida',
      TipoSeguro: "Asiento Pasajero/Vida Conductor",
      Coordinador: "Felipe Hernández García",
      Estado: "Emitida"
    },
    {
      ID: 24592,
      Fecha: '11/06/2023',
      Contratante: "Nombre Comercial S.A. 7",
      Rubro: 'Inmuebles',
      TipoSeguro: "Todo Seguro y Construcción",
      Coordinador: "Francisco González",
      Estado: "En revisión"
    },
    {
      ID: 98130,
      Fecha: '23/08/2023',
      Contratante: "Nombre Comercial S.A. 8",
      Rubro: 'Vida',
      TipoSeguro: "Comunidad",
      Coordinador: "María José Pérez Martínez",
      Estado: "En cotización"
    },
    {
      ID: 33785,
      Fecha: '14/10/2023',
      Contratante: "Nombre Comercial S.A. 9",
      Rubro: 'Vida',
      TipoSeguro: "Incendio",
      Coordinador: "Sofía Ramírez",
      Estado: "Con observaciones"
    },
    {
      ID: 67348,
      Fecha: '29/11/2023',
      Contratante: "Nombre Comercial S.A. 10",
      Rubro: 'Comunidad',
      TipoSeguro: "Seguro Crédito PY",
      Coordinador: "Cristóbal Fernández López",
      Estado: "Aprobada"
    },

        {
      ID: 24592,
      Fecha: '15/03/2023',
      Contratante: "Nombre Comercial S.A. 1",
      Rubro: 'Vehículo',
      TipoSeguro: "Vehículo Liviano",
      Coordinador: "Camila Soto",
      Estado: "En edición"
    },
    {
      ID: 98129,
      Fecha: '22/07/2023',
      Contratante: "Nombre Comercial S.A. 2",
      Rubro: 'Vida',
      TipoSeguro: "Asistencia en Viajes",
      Coordinador: "Andrés Salgado Pérez",
      Estado: "En revisión"
    },
    {
      ID: 33784,
      Fecha: '30/09/2023',
      Contratante: "Nombre Comercial S.A. 3",
      Rubro: 'Vida',
      TipoSeguro: "Responsabilidad Civil Médica",
      Coordinador: "Valentina Díaz Ríos",
      Estado: "Con observaciones"
    },
    {
      ID: 67347,
      Fecha: '05/12/2023',
      Contratante: "Nombre Comercial S.A. 4",
      Rubro: 'Vehículo',
      TipoSeguro: "Transporte Terrestre",
      Coordinador: "Joaquín Torres Martínez",
      Estado: "Aprobada"
    },
    {
      ID: 12915,
      Fecha: '18/02/2023',
      Contratante: "Nombre Comercial S.A. 5",
      Rubro: 'Crédito',
      TipoSeguro: "Seguro de Crédito Interno",
      Coordinador: "Renata Castro Vergara",
      Estado: "Rechazada"
    },
    {
      ID: 55268,
      Fecha: '27/04/2023',
      Contratante: "Nombre Comercial S.A. 6",
      Rubro: 'Vida',
      TipoSeguro: "Asiento Pasajero/Vida Conductor",
      Coordinador: "Felipe Hernández García",
      Estado: "Emitida"
    },
    {
      ID: 24592,
      Fecha: '11/06/2023',
      Contratante: "Nombre Comercial S.A. 7",
      Rubro: 'Inmuebles',
      TipoSeguro: "Todo Seguro y Construcción",
      Coordinador: "Francisco González",
      Estado: "En revisión"
    },
    {
      ID: 98130,
      Fecha: '23/08/2023',
      Contratante: "Nombre Comercial S.A. 8",
      Rubro: 'Vida',
      TipoSeguro: "Comunidad",
      Coordinador: "María José Pérez Martínez",
      Estado: "En cotización"
    },
    {
      ID: 33785,
      Fecha: '14/10/2023',
      Contratante: "Nombre Comercial S.A. 9",
      Rubro: 'Vida',
      TipoSeguro: "Incendio",
      Coordinador: "Sofía Ramírez",
      Estado: "Con observaciones"
    },
    {
      ID: 67348,
      Fecha: '29/11/2023',
      Contratante: "Nombre Comercial S.A. 10",
      Rubro: 'Comunidad',
      TipoSeguro: "Seguro Crédito PY",
      Coordinador: "Cristóbal Fernández López",
      Estado: "Aprobada"
    },
  ]);

  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Rubro 1',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Rubro 2',
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
  ]);
/* Fin llamadas a servicios */


}

