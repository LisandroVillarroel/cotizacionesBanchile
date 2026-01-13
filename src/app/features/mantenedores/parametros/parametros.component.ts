import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IParametroLista } from './parametro-Interface';
import { ParametrosService } from './parametro.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ConsultaParametroComponent } from './consulta-parametro/consulta-parametro.component';
import { AgregaParametroComponent } from './agrega-parametro/agrega-parametro.component';
import { ModificaParametroComponent } from './modifica-parametro/modifica-parametro.component';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-parametros',
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
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.css',
})
export default class ParametrosComponent implements OnInit {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  tipoParametro = signal<string>('');
  datoParametros = signal<IParametroLista[]>([]);
  parametroService = inject(ParametrosService);
  tipoUsuario = signal<string>('');

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoTipoUsuario = signal([{ p_tipo_usuario: 'A', descripcion: 'Administrador' },
  { p_tipo_usuario: 'S', descripcion: 'Supervisor' },
  { p_tipo_usuario: 'E', descripcion: 'Ejecutivo' },
  { p_tipo_usuario: 'C', descripcion: 'Coordinador' },]);

  displayedColumns: string[] = [
    'index',
    'id_parametro',
    'nombre_parametro',
    'valor_parametro',
    'descripcion_parametro',
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
    const tabla = new MatTableDataSource<IParametroLista>(this.datoParametros());
    tabla.paginator = this.paginator;
    tabla.sort = this.sort;
    return tabla;
  });

  constructor() {}

  AfterViewInit(): void {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  async ngOnInit() {
    this.rescataLista();
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataLista() {
    const estructura_lista = {
      p_id_usuario: this._storage()?.usuarioLogin?.usuario as string,
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario as string,
    };

    this.parametroService
      .postParametros(estructura_lista)
      .subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.datoParametros.set(dato.p_cursor);
          }
        },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }

  agregaNuevoParametro() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.tipoParametro();

    this.dialog
      .open(AgregaParametroComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  modificaParametro(datoParametros: IParametroLista): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoParametros;

    this.dialog
      .open(ModificaParametroComponent, dialogConfig)
        .afterClosed()
        .subscribe((data) => {
          if (data === 'modificado') {
            this.rescataLista();
          }
        });
  }

  consultaParametro(datoParametros: IParametroLista) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoParametros;

    this.dialog.open(ConsultaParametroComponent, dialogConfig)
    .afterClosed();
  }
}
