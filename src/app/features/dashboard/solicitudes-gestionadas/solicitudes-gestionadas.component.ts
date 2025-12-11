/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Component,
  ViewChild,
  inject,
  signal,
  input,
  computed,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  styleUrl: './solicitudes-gestionadas.component.css',
})
export class SolicitudesGestionadasComponent implements OnInit {
  datosSolicitud = input.required<IListadoSolicitudes[] | undefined>();
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  verEjec = true;
  verCoord = true;
  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService);

  tipoUsuario = this._storage()?.usuarioLogin?.tipoUsuario;

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

  filtroFormulario = signal<FormGroup>(
    new FormGroup({
      contratante: this.contratante,
      rubro: this.rubro,
      seguro: this.seguro,
      estado: this.estado,
      fecha: this.fecha,
    }),
  );

  displayedColumns: string[] = [
    'index',
    'id_solicitud',
    'fecha_creacion',
    'rut_contratante',
    'nombre_razon_social_contratante',
    'nombre_rubro',
    'nombre_tipo_seguro',
    'nombre_ejecutivo_banco',
    'nombre_coordinador',
    'id_estado_solicitud',
    'accion',
  ];

  dataSourceSolicitud = computed(() => {
    const tabla = new MatTableDataSource<IListadoSolicitudes>();
    tabla.data = this.datosSolicitud()!;
    this.setSortingAndPagination(tabla);
    return tabla;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  AfterViewInit(): void {
    this.setSortingAndPagination(this.dataSourceSolicitud());
  }

  setSortingAndPagination(dataSource: MatTableDataSource<IListadoSolicitudes>): void {
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datosFiltrados() {
    const contratante: string = this.filtroFormulario().value.contratante ?? '';
    const rubro = this.filtroFormulario().value.rubro ?? '';
    const tipoSeguro = this.filtroFormulario().value.seguro ?? '';
    const estado = this.filtroFormulario().value.estado ?? '';
    const fechaInicio_Inicial = this.filtroFormulario().value.fecha;

    /* const contratante: string = this.contratante.value as string;
    const rubro: number = Number(this.rubro.value);
    const tipoSeguro: string = this.seguro.value as string;
    const estado: string = this.estado.value as string;
    const fechaInicio_Inicial: Date = this.fecha.value as Date; */

    let fechaInicio = new Date();
    if (fechaInicio_Inicial != null) {
      fechaInicio = new Date(fechaInicio_Inicial);
    }

    this.formularioModificado();
    return this.datosSolicitud()!.filter((item) => {
      const cumpleContratante = item.nombre_razon_social_contratante
        .toLowerCase()
        .includes(contratante.toString().toLowerCase());
      const cumpleRubro = item.id_rubro.toString()?.includes(rubro.toString());
      const cumpleTipoSeguro = item.nombre_tipo_seguro
        ?.toLowerCase()
        .includes(tipoSeguro.toLowerCase());
      const cumpleEstado = item.descripcion_estado.toLowerCase().includes(estado.toLowerCase());
      let cumpleFecha = true;
      const fechaBase = new Date(item.fecha_creacion);

      if (fechaInicio_Inicial != null) {
        cumpleFecha =
          !fechaInicio ||
          (fechaBase.getFullYear() === fechaInicio.getFullYear() &&
            fechaBase.getMonth() === fechaInicio.getMonth() &&
            fechaBase.getDate() === fechaInicio.getDate());
      }
      return cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleEstado && cumpleFecha;
    });
  }

  limpiaFiltros() {
    this.filtroFormulario().reset();
  }

  ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.cargaRubros();
    this.cargaEstados();
    this.limpiaFiltros();

    this.formularioModificado.set(true);
    this.filtroFormulario().valueChanges.subscribe(() => {
      this.datosFiltrados();
      this.updateTableData();
    });

    switch (this.tipoUsuario) {
      case 'E':
        this.verCoord = false;
        break;
      case 'C':
        this.verEjec = false;
        break;
      case 'S':
        this.verEjec = false;
        this.verCoord = false;
        break;
      case 'A':
        this.verEjec = false;
        this.verCoord = false;
        break;
    }
  }

  private updateTableData(): void {
    this.dataSourceSolicitud().data = this.datosFiltrados();
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          console.log('Rubros cargados:', dato.p_cursor);
          this.datoRubros.set(dato.p_cursor);
        }
      },
      error: () => {
        void this.notificacioAlertnService.error(
          'ERROR',
          'No fue posible obtener el listado de Rubros.',
        );
      },
    });
  }

  cargaEstados() {
    this.estadoService.getEstado().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datosEstados.set(dato.p_cursor);
        }
      },
      error: () => {
        void this.notificacioAlertnService.error(
          'ERROR',
          'No fue posible obtener el listado de Estados',
        );
      },
    });
  }

  seleccionaRubro(id_rubro: number) {
    this.tipoSeguroService.postTipoSeguro(id_rubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
        }
      },
      error: () => {
        void this.notificacioAlertnService.error(
          'ERROR',
          'No fue posible obtener el listado de Tipos de Seguro',
        );
      },
    });
  }

  retorno = output<boolean>();
  verDetalle(IdSolicitud: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = {
      idSolicitud: IdSolicitud,
      flagSoloCerrar: true,
    };

    this.dialog
      .open(DetalleSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.retorno.emit(true);
      });
  }

  getEstadoFiltrado(idEstado: number) {
    return this.datosEstados().filter((item) => item.id_estado_solicitud === idEstado);
  }

  getCellStyle(idEstado: number) {
    const estado = this.getEstadoFiltrado(idEstado)[0];
    return {
      color: estado?.color_estado,
      'background-color': estado?.background_estado,
      border: '1px solid' + estado?.color_estado,
      width: '141px',
      'text-align': 'center',
      'padding-left': '1%',
      'padding-right': '1%',
    };
  }
}
