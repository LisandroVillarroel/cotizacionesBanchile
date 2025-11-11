import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IUsuario } from './usuario-Interface';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatFormFieldModule,
      MatDialogModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatIconModule,
      MatTooltipModule,
      MatInputModule,],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  notificacioAlertnService = inject(NotificacioAlertnService);

  datoUsuarios = signal<IUsuario[]>([]);
  usuarioService = inject(UsuarioService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumnsUsuario: string[] = [
    'index',
    'rutUsuario',
    'nombreUsuario',
    'apePaternoUsuario',
    'apeMaternoUsuario',
    'mailUsuario',
    'telefonoUsuario',
    'dependenciaUsuario',
    'opciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilterAsegurado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator!.firstPage();
    }
  }

  dataSource = computed(() => {
    const tabla = new MatTableDataSource<IUsuario>(
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
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataListaAsegurados(p_id_solicitud: number) {
    const estructura_listaAsegurados = {
      p_id_solicitud: p_id_solicitud,
    };

    this.usuarioService
      .postListadoUsuario(estructura_listaAsegurados)
      .subscribe({
        next: (dato: IUsuario) => {
          if (dato.codigo === 200) {
            this.datoUsuarios.set(dato.p_cursor);
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
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
      .open(AgregaSolicitudAseguradoComponent, dialogConfig)
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
      .open(EliminaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataListaAsegurados(this.idSolicitud()!);
        }
      });
  }
}
