import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { InterfazRubro, IRubro, IRubroLista } from './rubros-interface';
import { RubrosService } from './rubros.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ConsultaRubroComponent } from './consulta-rubro/consulta-rubro.component';
import { AgregaRubroComponent } from './agrega-rubro/agrega-rubro.component';
import { ModificaRubroComponent } from './modifica-rubro/modifica-rubro.component';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-rubros',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatIconModule, MatTooltipModule, MatInputModule],
  templateUrl: './rubros.component.html',
  styleUrl: './rubros.component.css',
})
export default class RubrosComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  tipoRubro = signal<string>('');
  datoRubros = signal<IRubroLista[]>([]);
  rubroService = inject(RubrosService);
  tipoUsuario = signal<string>('');

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoTipoUsuario = signal([{ p_tipo_usuario: 'A', descripcion: 'Administrador' },
  { p_tipo_usuario: 'S', descripcion: 'Supervisor' },
  { p_tipo_usuario: 'E', descripcion: 'Ejecutivo' },
  { p_tipo_usuario: 'C', descripcion: 'Coordinador' },]);

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
    const tabla = new MatTableDataSource<IRubroLista>(
      this.datoRubros()
    );
    tabla.paginator = this.paginator;
    tabla.sort = this.sort;
    return tabla;
  });

  constructor() {}

  AfterViewInit(): void {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  OnInit() {
    this.rescataLista();
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataLista() {
    const estructura_lista = {
      //p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      //p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
      //p_tipo_consulta: p_tipo_consulta_

      p_id_usuario: 'adm042', // o desde storage
      //p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      //p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
       p_tipo_usuario: 'A',
    };

    this.rubroService
      .postRubros(estructura_lista)
      .subscribe({
        next: (dato) => {
          console.log('Dato Rescata Lista Rubros:', dato);
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
      .open(AgregaRubroComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  modificaRubro(datoRubros: IRubroLista): void {
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
      .open(ModificaRubroComponent, dialogConfig)
        .afterClosed()
        .subscribe((data) => {
          if (data === 'modificado') {
            console.log('Modificación Confirmada:', data);
            this.rescataLista();
          }
        });
  }

  consultaRubro(datoRubros: IRubroLista) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoRubros;

    this.dialog.open(ConsultaRubroComponent, dialogConfig).afterClosed();
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
