import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import {  DatosUsuarioLista, IUsuario, IUsuarioLista, IUsuarioListaParametro } from './usuario-Interface';
import { UsuarioService } from './usuario.service';
import { AgregaUsuarioComponent } from './agrega-usuario/agrega-usuario.component';
import { ModificaUsuarioComponent } from './modifica-usuario/modifica-usuario.component';
import { ConsultaUsuarioComponent } from './consulta-usuario/consulta-usuario.component';
import { EliminaUsuarioComponent } from './elimina-usuario/elimina-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatTableModule, MatSortModule,
      MatPaginatorModule, MatIconModule, MatTooltipModule,  MatInputModule],
  templateUrl: './usuarios.component.html',
  styles: `
    table {
      width: 100%;
    }
  `
})
export default class UsuariosComponent {
  notificacioAlertnService = inject(NotificacioAlertnService);

  tipoUsuario = signal<string>('');
  datoUsuarios = signal<IUsuarioLista[]>([]);
  usuarioService = inject(UsuarioService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumns: string[] = [
    'index',
    'p_tipo_usuario',
    'p_id_usuario',
    'p_rut_usuario',
    'p_nombre_usuario',
    'p_apellido_paterno_usuario',
    'p_apellido_materno_usuario',
    'p_mail_usuario',
    'p_telefono_usuario',
    'p_id_dependencia_usuario',
    'p_id_perfil',
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
    const tabla = new MatTableDataSource<IUsuarioLista>(
      this.datoUsuarios()
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
    this.rescataLista("1");
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataLista(p_id_solicitud: string) {
    const estructura_lista = {
      p_id_usuario: "sup002",
    p_tipo_usuario: "S",
    p_tipo_consulta:"E"
    };

    this.usuarioService
      .postListadoUsuario(estructura_lista)
      .subscribe({
        next: (dato: DatosUsuarioLista) => {
          if (dato.codigo === 200) {
            console.log('Lista de Usuarios:', dato.p_cursor);
            this.datoUsuarios.set(dato.p_cursor);
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }

  agregaNuevo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.tipoUsuario();

    this.dialog
      .open(AgregaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista(this.tipoUsuario()!);
        }
      });
  }

  modificaUsuario(datoUsuarioPar: IUsuario): void {
    console.log('Dato Modificar:', datoUsuarioPar);
    const parametro: IUsuarioListaParametro = {
      datoUsuarioPar: datoUsuarioPar,
      tipoUsuario: this.tipoUsuario(),
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = parametro;

    this.dialog
      .open(ModificaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          console.log('Modificación Confirmada:', data);
          this.rescataLista(this.tipoUsuario()!);
        }
      });
  }

  consultaUsuario(datoUsuarioPar: IUsuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoUsuarioPar;

    this.dialog
      .open(ConsultaUsuarioComponent, dialogConfig)
      .afterClosed();
  }

  eliminaUsuario(datoUsuarioPar: IUsuario) {
     const parametro: IUsuarioListaParametro = {
      datoUsuarioPar: datoUsuarioPar,
      tipoUsuario: this.tipoUsuario(),
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = parametro;

    this.dialog
      .open(EliminaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataLista(this.tipoUsuario()!);
        }
      });
  }
}
