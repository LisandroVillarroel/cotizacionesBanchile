import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { InterfazRubro, IRubro } from './tipo-seguro-interface';
import { TipoSeguroService } from './tipo-seguro.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ConsultaTipoSeguroComponent } from './consulta-tipo-seguro/consulta-tipo-seguro.component';
import { AgregaTipoSeguroComponent } from './agrega-tipo-seguro/agrega-tipo-seguro.component';
import { ModificaTipoSeguroComponent } from './modifica-tipo-seguro/modifica-tipo-seguro.component';

@Component({
  selector: 'app-tipo-seguro',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatIconModule, MatTooltipModule, MatInputModule],
  templateUrl: './tipo-seguro.component.html',
  styleUrl: './tipo-seguro.component.css'
})
export default class TipoSeguroComponent {
    notificacioAlertnService = inject(NotificacioAlertnService);

  tipoRubro = signal<string>('');
  datoRubros = signal<IRubro[]>([]);
  rubroService = inject(TipoSeguroService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumns: string[] = [
    'index',
    'id_rubro',
    'nombre_rubro',
    'estado_rubro',
    'fecha_creacion',
    'usuario_creacion',
    'fecha_modificacion',
    'usuario_modificacion',
    'opciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator!.firstPage();
    }
  }

  dataSource = computed(() => {
    const tabla = new MatTableDataSource<IRubro>(
      this.datoRubros()
    );
    tabla.paginator = this.paginator;
    tabla.sort = this.sort;
    return tabla;
  });

  constructor() {

  }

  ngAfterViewInit(): void {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  async ngOnInit() {
    this.rescataLista();
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataLista() {
    const estructura_lista = {
    };

    this.rubroService
      .postRubros()
      .subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            console.log('Lista de Rubros:', dato.p_cursor);
            this.datoRubros.set(dato.p_cursor);
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
        },
      });
  }

  agregaNuevoRubro() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.tipoRubro();

    this.dialog
      .open(AgregaTipoSeguroComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  modificaRubro(datoRubros: IRubro): void {
    console.log('Dato Modificar:', datoRubros);
    // const parametro: IUsuarioListaParametro = {
    //   datoUsuarioPar: datoUsuarioPar,
    //   tipoUsuario: this.tipoUsuario(),
    // };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoRubros;

    this.dialog
      .open(ModificaTipoSeguroComponent, dialogConfig)
    //     .afterClosed()
    //     .subscribe((data) => {
    //       if (data === 'modificado') {
    //         console.log('Modificación Confirmada:', data);
    //         this.rescataLista(this.tipoUsuario()!);
    //       }
    //     });
  }

  consultaRubro(datoRubros: IRubro) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoRubros;

    this.dialog
      .open(ConsultaTipoSeguroComponent, dialogConfig)
      .afterClosed();
  }

  //eliminaRubro(datoRubros: IRubro) {
  //    const parametro: IUsuarioListaParametro = {
  //     datoUsuarioPar: datoUsuarioPar,
  //     tipoUsuario: this.tipoUsuario(),
  //   };

  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  // dialogConfig.width = '80%';
  // dialogConfig.height = '80%';
  // dialogConfig.position = { top: '3%' };
  // dialogConfig.data = datoRubros;

  // this.dialog
  //   .open(EliminaRubroComponent, dialogConfig)
  //     .afterClosed()
  //     .subscribe((data) => {
  //       if (data === 'eliminado') {
  //         this.rescataLista(this.tipoUsuario()!);
  //       }
  //     });
  // }
}
