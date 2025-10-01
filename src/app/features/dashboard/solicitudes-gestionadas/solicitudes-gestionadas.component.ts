import { Component, ViewChild, inject, signal, NgModule, input, effect, computed, OnInit } from '@angular/core';
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

export class SolicitudesGestionadasComponent  implements OnInit {
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

  filtroContratante = signal('');
  filtroRubro = signal('');
  filtroTipoSeguro = signal('');
  filtroEstado = signal('');
  filtroFecha = signal<Date | null>(null);

  panelOpenState = false;

  formularioModificado = signal(false);

  contratante = new FormControl();
    rubro = new FormControl();
    seguro = new FormControl();
    estado = new FormControl();
    fecha = new FormControl<Date | null>(null);

  filtroFormulario = signal<FormGroup>(new FormGroup({
    contratante : this.contratante,
    rubro : this.rubro,
    seguro : this.seguro,
    estado : this.estado,
    fecha : this.fecha
    })
  );



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


  // Señal computada para los datos filtrados
  datosFiltrados() {
    const contratante = this.filtroFormulario().value.contratante??'';
    const rubro = this.filtroFormulario().value.rubro?.nombre_rubro??'';
    const tipoSeguro = this.filtroFormulario().value.seguro??'';
    const estado = this.filtroFormulario().value.estado??'';
    console.log('his.filtroFormulario().value:',this.filtroFormulario().value.fecha)
    const fechaInicio = new Date(this.filtroFormulario().value.fecha);
    this.formularioModificado();
    console.log('this.datosSolicitud():',this.datosSolicitud())
    return this.datosSolicitud()!.filter(item => {

      const cumpleContratante = item.nombre_razon_social_contratante.toLowerCase().includes(contratante.toLowerCase());
      const cumpleRubro = item.nombre_rubro.toLowerCase()?.includes( rubro.toLowerCase());
      const cumpleTipoSeguro = item.nombre_tipo_seguro?.includes(tipoSeguro);
      const cumpleEstado = item.descripcion_estado.includes(estado);

    const fechaBase = new Date(item.fecha_creacion);

      const cumpleFecha = !fechaInicio || (
        fechaBase.getFullYear() === fechaInicio.getFullYear() &&
        fechaBase.getMonth() === fechaInicio.getMonth() &&
        fechaBase.getDate() === fechaInicio.getDate()
      );


      return  cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleEstado && cumpleFecha;
    });
  };

//ngOnInit(): void {
  // Suscribirse a los cambios del formulario y actualizar las señales
  //  this.filtroContratante.set(this.filtroFormulario().get('contratante')?.valueChanges)

/*
    this.filterForm.get('estado')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(valor => this.filtroEstado.set(valor));

    this.filterForm.get('fechaRange')?.get('start')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(valor => this.filtroFechaInicio.set(valor));

    this.filterForm.get('fechaRange')?.get('end')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(valor => {
        // Ajustar la fecha final para incluir todo el día
        const fechaAjustada = valor ? new Date(valor) : null;
        if (fechaAjustada) {
          fechaAjustada.setHours(23, 59, 59, 999);
        }
        this.filtroFechaFin.set(fechaAjustada);
      });
      */
  //  }
  /*
  applyFilterSolicitud(campo: string, valor: String) {
    //  const filterValue = (valor.target as HTMLInputElement).value;
    console.log('campo:', campo + ' Valor Inicial:', valor)
    this.dataSourceSolicitud().filterPredicate = (data: any, filter: string) => {
      const dataValue = data[campo] ? data[campo].toString() : '';
      console.log('dataValue:',dataValue.toLowerCase().includes(filter.toLowerCase()))
      return dataValue.toLowerCase().includes(filter.toLowerCase());
    };

    this.dataSourceSolicitud().filter = valor.trim().toLowerCase();
  }

    if (this.dataSourceSolicitud().paginator) {
      this.dataSourceSolicitud().paginator!.firstPage();
    }
  }


*/
  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.estado.reset();

    this.dataSourceSolicitud().filter = '';
  }


  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';

    // this.dataSourceSolicitud().data = this.datosSolicitud()!;
    this.cargaRubros();
    this.cargaEstados();
    this.limpiaFiltros();

    this.formularioModificado.set(true);
     // Suscribirse a los cambios del formulario
    this.filtroFormulario().valueChanges.subscribe(() => {
      console.log('paso 1')
      this.datosFiltrados()
      this.updateTableData();
    });
  }

  private updateTableData(): void {
    console.log('this.datosFiltrados():',this.datosFiltrados())
    this.dataSourceSolicitud().data = this.datosFiltrados();
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

  async seleccionaRubro(datos: IRubro) {
    console.log("rubros: ", datos);
    const _codigoRubro = datos.id_rubro
    const estructura_codigoRubro = { p_id_rubro: _codigoRubro };
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


/*
  get estilosTemperatura() {
    return {
      'background-color': this.temperatura > 30 ? 'red' :
                         this.temperatura > 20 ? 'orange' : 'blue',
      'color': 'white',
      'display': this.isVisible ? 'block' : 'none',
      'font-size': '20px'
    };
  }

    if (value == 1) { //'Aprobada'
      return 'aprobada';
    } else if (value == 2) {  //'Anulada'
      return 'anulada';
    } else if (value == 3) { //'Devuelta'
      return 'observ';
    } else if (value == 4) {  //'En Cotizacion'
      return 'cotizacion';
    } else if (value == 5) {  //'En Edicion'
      return 'edicion';
    } else if (value == 6) { //'En Revision'
      return 'revision';
    } else if (value == 7) { //'Propuesta Emitida'
      return 'emitida';
    } else if (value == 8) { //'Propuesta Pendiente'
      return 'pendiente';
    } else if (value == 9) {  //'Rechazada'
      return 'rechazada';
    } else { //if (value == 10) { //'Terminada'
      return 'terminada';
    } */

  /* Fin llamadas a servicios */
  verDetalle(IdSolicitud: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
      .open(DetalleSolicitudComponent, dialogConfig)
      .afterClosed()
  }

  getEstadoFiltrado(idEstado: number){
    return this.datosEstados().filter(item =>
      item.id_estado_solicitud===idEstado
    );
  }

  getCellStyle(idEstado: number) {
    const estado = this.getEstadoFiltrado(idEstado)[0];
    return {
      'color': estado.color_estado,
      'background-color': estado.background_estado,
      'border': '1px solid' + estado.color_estado,
      'width': 'fit-content',
      'padding-left': '5%',
      'padding-right': '5%'
    };
  }
}

function takeUntilDestroyed(): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

