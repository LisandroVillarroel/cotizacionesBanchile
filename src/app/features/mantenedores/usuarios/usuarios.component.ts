import { Component, computed, inject, OnInit, signal, ViewChild, AfterViewInit } from '@angular/core';
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
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule],
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


export default class UsuariosComponent implements OnInit {
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  usuarioService = inject(UsuarioService);
private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoUsuarios = signal<IUsuarioLista[]>([]);
  datoPerfilesUsuarios = signal<IUsuarioPerfile[]>([]);
  loading = signal(false);
  errorMsg = signal<string | null>(null);




  // Estado de selección (arranca sin seleccionar)
  tipoConsulta: string = '';

  //tipoConsulta:string = 'E';

  //tipoUsuarioSelect = new FormControl('', Validators.required);
  tipoUsuarioSelect = new FormControl<string>('', { nonNullable: true });
  agregaSolicitudContratante = signal<FormGroup>(
    new FormGroup({
      tipoUsuario: this.tipoUsuarioSelect,
    })
  );




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
  dataSource = new MatTableDataSource<IUsuarioLista>([]);

ngOnInit() {
    this.LitaPerfiles();
    //this.rescataLista(this.tipoConsulta);
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';

// Reaccionar al cambio del combo (además del (selectionChange) del template)
    this.tipoUsuarioSelect.valueChanges.subscribe((val) => {
      this.seleccionaTipoUsuario(val);
    });
  }


ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Predicate de filtro (opcional)
    this.dataSource.filterPredicate = (data, filter) => {
      const texto = filter.trim().toLowerCase();
      return [
        data.p_nombre_usuario,
        data.p_apellido_paterno_usuario,
        data.p_apellido_materno_usuario,
        data.p_mail_usuario,
        data.p_rut_usuario,
      ]
        .filter(Boolean)
        .map((x) => String(x).toLowerCase())
        .some((campo) => campo.includes(texto));
    };
  }



applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }



 private rescataLista(tipo: string) {
       this.loading.set(true);
    this.errorMsg.set(null);

    this.usuarioService
      .postListadoUsuario(
        this._storage()!.usuarioLogin.usuario,
        this._storage()!.usuarioLogin.tipoUsuario!,
        tipo
      )
      .subscribe({
        next: (dato: DatosUsuarioLista) => {
          const registros = dato.codigo === 200 ? (dato.p_cursor ?? []) : [];
          this.datoUsuarios.set(registros);
          this.dataSource.data = registros;
          this.dataSource.paginator?.firstPage();
          this.loading.set(false);
        },
        error: () => {
          this.errorMsg.set('Error Inesperado');
          this.datoUsuarios.set([]);
          this.dataSource.data = [];
          this.dataSource.paginator?.firstPage();
          this.loading.set(false);
          this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
        },
      });
  }



  LitaPerfiles() {
    this.usuarioService
      .postListaPerfiles(this._storage()!.usuarioLogin.usuario!, this._storage()!.usuarioLogin.tipoUsuario!)
      .subscribe({
        next: (dato: IUsuarioListaPerfiles) => {
          if (dato.codigo === 200) {
            this.datoPerfilesUsuarios.set(dato.perfiles);
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
        },
      });
  }


  agregaNuevo() {
    const datoUsuarioPar = {
      tipoConsulta: this.tipoConsulta
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoUsuarioPar;

    this.dialog
      .open(AgregaUsuarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista(this.tipoConsulta);
        }
      });
   }

  modificaUsuario(datoUsuarioPar: IUsuario): void {
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
        console.log('data modifica usuario:', data);
        if (data === 'modificado') {
          this.rescataLista(this.tipoConsulta);
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
          this.rescataLista(this.tipoConsulta);
        }
      });
   }


seleccionaTipoUsuario(valor: string) {
  console.log('Tipo Usuario Seleccionado:', valor);
  this.tipoConsulta = valor; // siempre string
  if (!valor) {
    this.datoUsuarios.set([]);
    this.dataSource.data = [];
    this.dataSource.paginator?.firstPage();
    return;
  }
  this.rescataLista(valor); // OK: espera string
}



}
