import { Component, ViewChild, inject, signal, NgModule, input, effect, computed } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { IListadoSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { EstadoService } from '@shared/service/estado.service';
import { IEstado } from '@shared/modelo/estado-interface';

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

export class SolicitudesGestionadasComponent {
  datosSolicitud = input.required<IListadoSolicitudes[] | undefined>();

  //datosSolicitudActual=signal<IListadoSolicitudes[]>([]);

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService);
  tipoUsuario = "E";
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
    'id_solicitud',
    'fecha_creacion',
    'rut_contratante',
    'nombre_razon_social_contratante',
    'nombre_rubro',
    "nombre_tipo_seguro",
    "nombre_ejecutivo_banco",
    "nombre_coordinador",
    "id_estado_solicitud",
    "accion"
  ];


  dataSourceSolicitud = computed(() => {
    const tabla = new MatTableDataSource<IListadoSolicitudes>(this.datosSolicitud());
    this.setSortingAndPagination(tabla);
    return tabla
  });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    //this.dataSourceSolicitud().paginator = this.paginatorSolicitud;
    //this.dataSourceSolicitud().sort = this.sortSolicitud;
    this.setSortingAndPagination(this.dataSourceSolicitud());
  }

   setSortingAndPagination(dataSource: MatTableDataSource<IListadoSolicitudes>): void {
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  applyFilterSolicitud(campo: string, valor: String) {
    //  const filterValue = (valor.target as HTMLInputElement).value;
    console.log('campo:',campo  + ' Valor Inicial:',valor)
    this.dataSourceSolicitud().filterPredicate = (data: any, filter: string) => {
      const dataValue = data[campo] ? data[campo].toString() : '';
      return dataValue.toLowerCase().includes(filter.toLowerCase());
    };

    this.dataSourceSolicitud().filter = valor.trim().toLowerCase();

    if (this.dataSourceSolicitud().paginator) {
      this.dataSourceSolicitud().paginator!.firstPage();
    }
  }

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.estado.reset();

    this.dataSourceSolicitud().filter= '';
  }


  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';

   // this.dataSourceSolicitud().data = this.datosSolicitud()!;
    this.cargaRubros();
    this.cargaEstados();
    this.limpiaFiltros();
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
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

  cargaEstados() {
   this.estadoService.getEstado().subscribe({
     next: (dato) => {
       if (dato.codigo === 200) {
          this.datosEstados.set(dato.p_cursor);
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

/*   cargaEstados() {
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

  } */

  async seleccionaRubro(datos: IRubro) {
    const _codigoRubro=datos.id_rubro
    const estructura_codigoRubro = { id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
          //console.log("Cargó productos", this.rescatadoSeguro());
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

  getCellClass(value: number): string {
    if (value == 1) { //'Aprobada'
      return 'aprobada';
    } else if (value == 2) {  //'Anulada'
      return 'anulada';
    } else if (value == 3) { //'Devuelta'
      return 'observ';
    } else if (value == 4) {  //'En Cotizacion'
      return 'cotizacion';
    }else if (value == 5) {  //'En Edicion'
      return 'edicion';
    } else if (value == 6) { //'En Revision'
      return 'revision';
    } else if (value == 7) { //'Propuesta Emitida'
      return 'emitida';
    } else if (value == 8) { //'Propuesta Pendiente'
      return 'pendiente';
    } else if(value==9){  //'Rechazada'
      return 'rechazada';
    } else { //if (value == 10) { //'Terminada'
      return 'terminada';
    }
  }

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
