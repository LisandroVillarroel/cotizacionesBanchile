import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { WritableSignal } from '@angular/core';

import { AgregaSolicitudAseguradoComponent } from './agrega-solicitud-asegurado/agrega-solicitud-asegurado.component';
import { ModificaSolicitudAseguradoComponent } from './modifica-solicitud-asegurado/modifica-solicitud-asegurado.component';
import { ConsultaSolicitudAseguradoComponent } from './consulta-solicitud-asegurado/consulta-solicitud-asegurado.component';
import { EliminaSolicitudAseguradoComponent } from './elimina-solicitud-asegurado/elimina-solicitud-asegurado.component';
import {
  DatosAseguradosInterface,
  IAsegurado,
  IAseguradoLista,
  IAseguradoListaParametro,
} from '../modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '../service/asegurado.service';

@Component({
  selector: 'app-asegurado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
  ],
  templateUrl: './asegurado.component.html',
  styleUrl: './asegurado.component.css',
})
export class AseguradoComponent {
  idSolicitud = input.required<string>();
  datoAsegurados = signal<IAseguradoLista[]>([]);
  mostrarBotonAtras = input<boolean>(true);
  hayAsegurados = input<WritableSignal<boolean>>();

  //flagAsegurado = model(false);

  aseguradoService = inject(AseguradoService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumnsAsegurado: string[] = [
    'index',
    'rutAsegurado',
    'nombreRazonSocialAsegurado',
    'mailAsegurado',
    'telefonoAsegurado',
    'regionAsegurado',
    'ciudadAsegurado',
    'comunaAsegurado',
    'direccionAsegurado',
    'numeroDirAsegurado',
    'departamentoBlockAsegurado',
    'casaAsegurado',
    'opciones',
  ];
  //dataSourceAsegurado = new MatTableDataSource<IAseguradoLista>(this.datoAsegurados());

  @ViewChild(MatPaginator)
  paginatorAsegurado!: MatPaginator;
  @ViewChild(MatSort) sortAsegurado!: MatSort;

  applyFilterAsegurado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAsegurado().filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAsegurado().paginator) {
      this.dataSourceAsegurado().paginator!.firstPage();
    }
  }

  dataSourceAsegurado = computed(() => {
    const tabla = new MatTableDataSource<IAseguradoLista>(
      this.datoAsegurados()
    );
    tabla.paginator = this.paginatorAsegurado;
    tabla.sort = this.sortAsegurado;
    return tabla;
  });

  constructor() {
    effect(() => {
      // Llamar al método cada vez que el valor cambie
      this.rescataListaAsegurados(this.idSolicitud());
    });
  }

  //l=computed(() => this.rescataListaAsegurados(this.idSolicitud()));

  ngAfterViewInit(): void {
    console.log('entro a asegurado ngAfterViewInit', this.idSolicitud());
    this.dataSourceAsegurado().paginator = this.paginatorAsegurado;
    this.dataSourceAsegurado().sort = this.sortAsegurado;
  }

  async ngOnInit() {
    console.log('entro a asegurado', this.idSolicitud());
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.rescataListaAsegurados(this.idSolicitud()!);
  }

  rescataListaAsegurados(p_id_solicitud: string) {
    console.log('rescataListaAsegurados');
    const estructura_listaAsegurados = {
      p_id_solicitud: Number(p_id_solicitud),
    };
    this.aseguradoService
      .postListadoAsegurado(estructura_listaAsegurados)
      .subscribe({
        next: (dato: DatosAseguradosInterface) => {
          if (dato.codigo === 200) {
            this.datoAsegurados.set(dato.p_cursor);
            this.hayAsegurados()?.set(dato.p_cursor.length > 0);
          } else {
            if (dato.codigo != 500) {
              console.log('Error:', dato.mensaje);
            } else {
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }

  agregaNuevoAsegurado() {
    //  agregaNuevo(empresaInterface_: EmpresaI) {
    // Nuevo
    console.log('this.idSolicitud():', this.idSolicitud());
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.idSolicitud();

    this.dialog
      .open(AgregaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataListaAsegurados(this.idSolicitud()!);
          this.hayAsegurados()?.set(data.p_cursor.length > 0);
        }
      });
  }

  modificaAsegurado(datoAseguradoPar: IAseguradoLista): void {
    console.log('Dato Modificar;', datoAseguradoPar);
    const parametro: IAseguradoListaParametro = {
      datoAseguradoPar: datoAseguradoPar,
      idSolicitud: this.idSolicitud(),
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = parametro;
    this.dialog
      .open(ModificaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          console.log('Modificación Confirmada:', data);
          this.rescataListaAsegurados(this.idSolicitud()!);
        }
      });
  }

  consultaAsegurado(datoAseguradoPar: IAsegurado) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoAseguradoPar;
    this.dialog
      .open(ConsultaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed();
  }

  eliminaAsegurado(datoAseguradoPar: any) {
    const dialogConfig = new MatDialogConfig();
    const parametro: IAseguradoListaParametro = {
      datoAseguradoPar: datoAseguradoPar,
      idSolicitud: this.idSolicitud(),
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = parametro;
    this.dialog
      .open(EliminaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataListaAsegurados(this.idSolicitud()!);
          this.hayAsegurados()?.set(data.p_cursor.length > 0);
        }
      });
  }
}
