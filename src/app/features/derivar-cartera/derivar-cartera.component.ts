import { CommonModule } from '@angular/common';
import { Component, ViewChild,computed,inject, output, signal } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
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

@Component({
  selector: 'app-derivar-cartera',
  templateUrl: './derivar-cartera.component.html',
  styleUrls: ['./derivar-cartera.component.css'],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
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
  solicitudes = signal<ISolicitudCartera[] | undefined>([]);
  coordinadores = signal<ICoordinador[] | undefined>([]);
  ejecutivos = signal<IEjecutivo[] | undefined>([]);

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);
  carteraService = inject(CarteraService);
  request = {
    p_id_usuario: this._storage()?.usuarioLogin?.usuario ?? "",
    p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario ?? ""
  };

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  estadoService = inject(EstadoService);

  datoRubros = signal<IRubro[]>([]);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);
  datosEstados = signal<IEstado[]>([]);

  filtroCoordinador = signal('');
  filtroEjecutivo = signal('');
  filtroRubro = signal('');
  filtroTipoSeguro = signal('');
  filtroEstado = signal('');
  filtroFecha = signal<Date | null>(null);

  panelOpenState = false;

  formularioModificado = signal(false);

  coordinador = new FormControl();
  ejecutivo = new FormControl();
  rubro = new FormControl();
  seguro = new FormControl();
  estado = new FormControl();
  fecha = new FormControl<Date | null>(null);

  filtroFormulario = signal<FormGroup>(new FormGroup({
    coordinador: this.coordinador,
    ejecutivo: this.ejecutivo,
    rubro: this.rubro,
    seguro: this.seguro,
    estado: this.estado,
    fecha: this.fecha
  })
  );

  displayedColumns: string[] = [
    'index',
    'selected',
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
    const tabla = new MatTableDataSource<ISolicitudCartera>();
    tabla.data = this.solicitudes()!;
    this.setSortingAndPagination(tabla);
    return tabla;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  AfterViewInit(): void {
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
    const rubro = this.filtroFormulario().value.rubro?.nombre_rubro ?? '';
    const tipoSeguro = this.filtroFormulario().value.seguro ?? '';
    const estado = this.filtroFormulario().value.estado ?? '';
    const fechaInicio_Inicial = this.filtroFormulario().value.fecha;

    let fechaInicio = new Date();
    if (fechaInicio_Inicial != null) {
      fechaInicio = new Date(this.filtroFormulario().value.fecha);
    }

    this.formularioModificado();
    return this.solicitudes()!.filter(item => {

      const cumpleCoordinador = item.nombre_coordinador.toLowerCase().includes(coordinador.toLowerCase());
      const cumpleEjecutivo = item.nombre_ejecutivo_banco.toLowerCase().includes(ejecutivo.toLowerCase());
      const cumpleRubro = item.nombre_rubro.toLowerCase()?.includes(rubro.toLowerCase());
      const cumpleTipoSeguro = item.nombre_tipo_seguro?.includes(tipoSeguro);
      const cumpleEstado = item.descripcion_estado.includes(estado);
      let cumpleFecha = true;
      const fechaBase = new Date(item.fecha_creacion);

      if (fechaInicio_Inicial != null) {
        cumpleFecha = !fechaInicio || (
          fechaBase.getFullYear() === fechaInicio.getFullYear() &&
          fechaBase.getMonth() === fechaInicio.getMonth() &&
          fechaBase.getDate() === fechaInicio.getDate()
        );
      }
      return cumpleCoordinador && cumpleEjecutivo && cumpleRubro && cumpleTipoSeguro && cumpleEstado && cumpleFecha;
    });
  }

  private updateTableData(): void {
    this.dataSourceSolicitud().data = this.datosFiltrados();
  }

  limpiaFiltros() {
    this.filtroFormulario().reset();
  }

  async OnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.cargaCoordinadores();
    this.cargaEjecutivos();
    this.cargaRubros();
    this.cargaEstados();
    //this.cargaSolicitudes();
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
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener  el listado de Coordinadores.');
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
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener  el listado de Ejecutivos.');
      },
    });
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener  el listado de Rubros.');
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
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener  el listado de Estados.');
      },
    });
  }

  async seleccionaRubro(datos: IRubro) {
    this.tipoSeguroService.postTipoSeguro(datos.p_id_rubro).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.rescatadoSeguro.set(dato.c_TipoSeguros);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'No fue posible obtener  el listado de Tipos de Seguro.');
      },
    });
  }

  cargaSolicitudes(){
    this.carteraService.postlistarCartera(this.request).subscribe({
      next: async (dato) => {
        if (dato.codigo === 200) {
          const res = dato.ps_cursor;
          res.map((valor: ISolicitudCartera)=> {
            return {
              ...valor, // Copiamos las propiedades originales
              selected: false
            }
          })
          this.solicitudes.set(res) ;
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener  el listado de Solicitudes.');
      },
    });
  }

  retorno = output<boolean>();
  derivar() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = {
      id_solicitud: 3,
      id_coordinador_anterior: "true",
      id_coordinador_nuevo: "true"
    };

    this.dialog
      .open(DetalleSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => { this.retorno.emit(true); })
  }

}
