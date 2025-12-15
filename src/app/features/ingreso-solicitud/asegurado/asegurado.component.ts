import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
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

import {
  DatosAseguradosInterface,
  IAsegurado,
  IAseguradoLista,
  IAseguradoListaParametro,
} from '../modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '../service/asegurado.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { AgregaAseguradoComponent } from './agrega-asegurado/agrega-asegurado.component';
import { ModificaAseguradoComponent } from './modifica-asegurado/modifica-asegurado.component';
import { ConsultaAseguradoComponent } from './consulta-asegurado/consulta-asegurado.component';
import { EliminaAseguradoComponent } from './elimina-asegurado/elimina-asegurado.component';

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
export class AseguradoComponent implements OnInit {
  idSolicitud = input.required<number>();
  mostrarSoloConsulta = input.required<boolean>();  //Es llamado de varios componentes ve si es consulta o ingreso
  datoEmitidoAsegurado = output<boolean>();
  notificacioAlertnService= inject(NotificacioAlertnService);

  hayAsegurados = signal<boolean>(false);

  //flagAsegurado = model(false);
  datoAsegurados = signal<IAseguradoLista[]>([]);
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

  valor=computed(()=>{
    this.datoEmitidoAsegurado.emit(this.hayAsegurados())
  })

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
      if (this.idSolicitud() !== 0){
        this.rescataListaAsegurados(this.idSolicitud() );
      }

       this.datoEmitidoAsegurado.emit(this.hayAsegurados())
    }, { allowSignalWrites: true });
  }

  //l=computed(() => this.rescataListaAsegurados(this.idSolicitud()));

  AfterViewInit(): void {
    console.log('entro a asegurado ngAfterViewInit', this.idSolicitud());
    this.dataSourceAsegurado().paginator = this.paginatorAsegurado;
    this.dataSourceAsegurado().sort = this.sortAsegurado;
  }

  ngOnInit() {
    console.log('entro a asegurado', this.idSolicitud());
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataListaAsegurados(p_id_solicitud: number) {
    this.aseguradoService
      .postListadoAsegurado(p_id_solicitud)
      .subscribe({
        next: (dato: DatosAseguradosInterface) => {
          if (dato.codigo === 200) {
            this.datoAsegurados.set(dato.p_cursor);
            this.hayAsegurados.set(dato.p_cursor.length > 0);
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','No fue posible obtener el listado de asegurados.');
        },
      });
  }

  agregaNuevoAsegurado() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.idSolicitud();

    this.dialog
      .open(AgregaAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataListaAsegurados(this.idSolicitud()!);
        }
      });
  }

  modificaAsegurado(datoAseguradoPar: IAseguradoLista): void {
    console.log('Dato Modificar:', datoAseguradoPar);
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
      .open(ModificaAseguradoComponent, dialogConfig)
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
      .open(ConsultaAseguradoComponent, dialogConfig)
      .afterClosed();
  }

  eliminaAsegurado(datoAseguradoPar: IAseguradoLista) {
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
      .open(EliminaAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataListaAsegurados(this.idSolicitud()!);
        }
      });
  }
}
