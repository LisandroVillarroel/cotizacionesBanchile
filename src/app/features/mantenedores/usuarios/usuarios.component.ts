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
import { DatosUsuarioLista, IUsuario, IUsuarioLista, IUsuarioListaParametro, IUsuarioListaPerfiles, IUsuarioPerfile } from './usuario-Interface';
import { UsuarioService } from './usuario.service';
import { AgregaUsuarioComponent } from './agrega-usuario/agrega-usuario.component';
import { ModificaUsuarioComponent } from './modifica-usuario/modifica-usuario.component';
import { ConsultaUsuarioComponent } from './consulta-usuario/consulta-usuario.component';
import { EliminaUsuarioComponent } from './elimina-usuario/elimina-usuario.component';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatTableModule, MatSortModule,
      MatPaginatorModule, MatIconModule, MatTooltipModule,  MatInputModule,
      MatSelectModule,ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styles: `
    table {
      width: 100%;
    }
    ::ng-deep  .mat-mdc-form-field-subscript-wrapper{
      height: 10px !important;
    }
    .buscar{
      display: flex;
      align-items: center;
      gap: 16px;
    }
  `
})


export default class UsuariosComponent {
  notificacioAlertnService = inject(NotificacioAlertnService);
 storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  datoUsuarios = signal<IUsuarioLista[]>([]);
  datoPerfilesUsuarios = signal<IUsuarioPerfile[]>([]);
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


  tipoUsuarioSelect = new FormControl('', Validators.required);
  agregaSolicitudContratante = signal<FormGroup>(
    new FormGroup({
      tipoUsuario: this.tipoUsuarioSelect,
    })
  );

  ngAfterViewInit(): void {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  async ngOnInit() {
    this.LitaPerfiles();
    this.rescataLista();
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  rescataLista() {

 /*   let tipo ="E";
    if(consulta=="E"){
      tipo ="Ejecutivos";
    }else if(consulta=="C"){
      tipo = "Coordinadores";
    }else { //if(consulta=="S")
      tipo = "Ejecutivos y Coordinadores";
    }
*/
    this.usuarioService
      .postListadoUsuario(this._storage()!.usuarioLogin.usuario, this._storage()!.usuarioLogin.tipoUsuario!, 'E')
      .subscribe({
        next: (dato: DatosUsuarioLista) => {
          if (dato.codigo === 200) {
            //console.log('Lista de Usuarios:', dato.p_cursor);
            this.datoUsuarios.set(dato.p_cursor);
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }

 LitaPerfiles() {
  this.usuarioService
      .postListaPerfiles(this._storage()!.usuarioLogin.usuario!,
   this._storage()!.usuarioLogin.tipoUsuario!)
      .subscribe({
        next: (dato: IUsuarioListaPerfiles) => {
          if (dato.codigo === 200) {
            this.datoPerfilesUsuarios.set(dato.perfiles);
          }
        },
        error: () => {
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
    dialogConfig.data = this._storage()!.usuarioLogin.tipoUsuario;

    this.dialog
      .open(AgregaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  modificaUsuario(datoUsuarioPar: IUsuario): void {
    console.log('Dato Modificar:', datoUsuarioPar);
  //  const parametro: IUsuarioListaParametro = {
   //   datoUsuarioPar: datoUsuarioPar,
 //     tipoUsuario: this.tipoUsuario(),
 //   };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoUsuarioPar;

    this.dialog
      .open(ModificaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          //console.log('Modificación Confirmada:', data);
          this.rescataLista();
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
      tipoUsuario: this._storage()!.usuarioLogin.tipoUsuario,
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
          this.rescataLista();
        }
      });
  }

  seleccionaTipoUsuario(event: Event) {
    console.log(event);

  }
}
