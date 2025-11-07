import { CommonModule } from '@angular/common';
import { Component, ViewChild,computed,inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IListadoSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { IEstado } from '@shared/modelo/estado-interface';
import { IRubro } from '@shared/modelo/rubro-interface';

import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { EstadoService } from '@shared/service/estado.service';

import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { RubroService } from '@shared/service/rubro.service';
import { StorageService } from '@shared/service/storage.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ICoordinador, IEjecutivo, ISolicitudCartera } from './cartera-interface';
import { CarteraService } from './cartera.service';
import { IRequest } from '@shared/modelo/servicios-interface';

@Component({
  selector: 'app-derivar-cartera',
  templateUrl: './derivar-cartera.component.html',
  styleUrls: ['./derivar-cartera.component.css'],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
  ],
})
export default class DerivarCarteraComponent{
  datosSolicitud = signal<ISolicitudCartera[] | undefined>([]);
  coordinadores = signal<ICoordinador[] | undefined>([]);
  ejecutivos = signal<IEjecutivo[] | undefined>([]);

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);
  carteraService = inject(CarteraService);
  request = {
    p_id_usuario: this._storage()?.usuarioLogin.usuario!,
    p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!
  };

/*   rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService); */

/*   datoRubros = signal<IRubro[]>([]);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);
  datosEstados = signal<IEstado[]>([]); */

  filtroCoordinador = signal('');
  filtroEjecutivo = signal('');
/*   filtroRubro = signal('');
  filtroTipoSeguro = signal('');
  filtroEstado = signal(''); */
  filtroFecha = signal<Date | null>(null);

  panelOpenState = false;

  formularioModificado = signal(false);

  coordinador = new FormControl();
  ejecutivo = new FormControl();
/*   rubro = new FormControl();
  seguro = new FormControl();
  estado = new FormControl(); */
  fecha = new FormControl<Date | null>(null);

  filtroFormulario = signal<FormGroup>(new FormGroup({
    coordinador: this.coordinador,
    ejecutivo: this.ejecutivo,
/*     rubro: this.rubro,
    seguro: this.seguro,
    estado: this.estado, */
    fecha: this.fecha
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
    var tabla = new MatTableDataSource<ISolicitudCartera>();
    tabla.data = this.datosSolicitud()!;
    this.setSortingAndPagination(tabla);
    return tabla;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.setSortingAndPagination(this.dataSourceSolicitud());
  }

  setSortingAndPagination(dataSource: MatTableDataSource<ISolicitudCartera>): void {
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datosFiltrados() {
    const coordinador = this.filtroFormulario().value.coordinador ?? '';
    const ejecutivo = this.filtroFormulario().value.ejecutivo ?? '';
/*     const rubro = this.filtroFormulario().value.rubro?.nombre_rubro ?? '';
    const tipoSeguro = this.filtroFormulario().value.seguro ?? '';
    const estado = this.filtroFormulario().value.estado ?? ''; */
    let fechaInicio_Inicial = this.filtroFormulario().value.fecha;

    let fechaInicio = new Date();
    if (fechaInicio_Inicial != null) {
      fechaInicio = new Date(this.filtroFormulario().value.fecha);
    }

    this.formularioModificado();
    return this.datosSolicitud()!.filter(item => {

      const cumpleCoordinador = item.nombre_coordinador.toLowerCase().includes(coordinador.toLowerCase());
      const cumpleEjecutivo = item.nombre_ejecutivo.toLowerCase().includes(ejecutivo.toLowerCase());
/*       const cumpleRubro = item.nombre_rubro.toLowerCase()?.includes(rubro.toLowerCase());
      const cumpleTipoSeguro = item.nombre_tipo_seguro?.includes(tipoSeguro);
      const cumpleEstado = item.descripcion_estado.includes(estado);*/
      let cumpleFecha = true;
      const fechaBase = new Date(item.fecha_creacion);

      if (fechaInicio_Inicial != null) {
        cumpleFecha = !fechaInicio || (
          fechaBase.getFullYear() === fechaInicio.getFullYear() &&
          fechaBase.getMonth() === fechaInicio.getMonth() &&
          fechaBase.getDate() === fechaInicio.getDate()
        );
      }
      //return cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleEstado && cumpleFecha;
      return cumpleCoordinador && cumpleEjecutivo && cumpleFecha;
    });
  };

  private updateTableData(): void {
    this.dataSourceSolicitud().data = this.datosFiltrados();
  }

  limpiaFiltros() {
    this.filtroFormulario().reset();
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.cargaCoordinadores();
    this.cargaEjecutivos();
    this.limpiaFiltros();

    this.formularioModificado.set(true);
    this.filtroFormulario().valueChanges.subscribe(() => {
      this.datosFiltrados()
      this.updateTableData();
    });
  }

  cargaCoordinadores(){
    this.carteraService.postlistarCoordinadores(this.request).subscribe({
      next: async (dato) => {
        if (dato.codigo === 200) {
          this.coordinadores.set(dato.p_cursor) ;
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
      },
    });
  }

  cargaEjecutivos(){
    this.carteraService.postlistarEjecutivos(this.request).subscribe({
      next: async (dato) => {
        if (dato.codigo === 200) {
          this.ejecutivos.set(dato.p_cursor) ;
        }
      },
      error: (error) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
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
      flagSoloCerrar: true
    };

    this.dialog
      .open(DetalleSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => { this.retorno.emit(true); })
  }

}
