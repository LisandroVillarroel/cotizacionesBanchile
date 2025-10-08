import { Component, ViewChild, inject, signal, input, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from '@angular/material/card';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { RubroService } from '@shared/service/rubro.service';
import { IRubro } from '@shared/modelo/rubro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { IListadoSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { EstadoService } from '@shared/service/estado.service';
import { IEstado } from '@shared/modelo/estado-interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

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
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  verEjec = true;
  verCoord = true;
  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService);

  tipoUsuario = "E"; //OJO!!! buscar en storage
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
    let fechaInicio_Inicial=this.filtroFormulario().value.fecha;

    let fechaInicio=new Date();
    if (fechaInicio_Inicial!=null){
         fechaInicio = new Date(this.filtroFormulario().value.fecha);
    }

    this.formularioModificado();
    return this.datosSolicitud()!.filter(item => {

      const cumpleContratante = item.nombre_razon_social_contratante.toLowerCase().includes(contratante.toLowerCase());
      const cumpleRubro = item.nombre_rubro.toLowerCase()?.includes( rubro.toLowerCase());
      const cumpleTipoSeguro = item.nombre_tipo_seguro?.includes(tipoSeguro);
      const cumpleEstado = item.descripcion_estado.includes(estado);
      let cumpleFecha=true;
      const fechaBase = new Date(item.fecha_creacion);

      if (fechaInicio_Inicial!=null){
        cumpleFecha = !fechaInicio || (
        fechaBase.getFullYear() === fechaInicio.getFullYear() &&
        fechaBase.getMonth() === fechaInicio.getMonth() &&
        fechaBase.getDate() === fechaInicio.getDate()
      );
    }
    return  cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleEstado && cumpleFecha;
    });
  };

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.estado.reset();
    this.fecha.reset();
    this.dataSourceSolicitud().filter= '';
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
      this.datosFiltrados()
      this.updateTableData();
    });

    switch(this._storage()?.usuarioLogin.perfilUsuario!){
      case "PCSE_EJCBCO":
        this.verCoord = false; break;
      case "PCSE_COORBCS":
        this.verEjec = false; break;
      case "PCSE_SUPBCS":
        this.verEjec = false; this.verCoord = false; break;
      case "PCSE_ADMIN":
        this.verEjec = false; this.verCoord = false; break;
    }
  }

  private updateTableData(): void {
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

