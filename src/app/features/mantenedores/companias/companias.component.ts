import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { ListarCompaniaComponent } from './listar-compania/listar-compania.component';
import { ListarContactoComponent } from './listar-contacto/listar-contacto.component';
import { ListarTiposeguroComponent } from './listar-tiposeguro/listar-tiposeguro.component';
import {
  ICompaniaSeguro,
  DatosCompaniaSeguro,
  IContactoCompania,
  DatosContactoCompania,
  ITipoSeguroCompania,
  DatosTipoSeguroCompania,
} from './compania-Interface';
import { CompaniaService } from './compania.service';
import { AgregaCompaniaComponent } from './agrega-compania/agrega-compania.component';
import { AgregaContactoComponent } from './agrega-contacto/agrega-contacto.component';
import { AgregaTiposeguroComponent } from './agrega-tiposeguro/agrega-tiposeguro.component';
import { ModificaCompaniaComponent } from './modifica-compania/modifica-compania.component';
import { ModificaContactoComponent } from './modifica-contacto/modifica-contacto.component';
import { ModificaTiposeguroComponent } from './modifica-tiposeguro/modifica-tiposeguro.component';

@Component({
  selector: 'app-companias',
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
    ListarCompaniaComponent,
    ListarContactoComponent,
    ListarTiposeguroComponent,
  ],
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.css'],
})
export default class CompaniasComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  selectedCompaniaId: number | null = null;

  datoCompanias = signal<ICompaniaSeguro[]>([]);
  displayedColumns: string[] = [
    'seleccion',
    // 'index',
    'p_rut_compania_seguro',
    'p_nombre_compania_seguro',
    'p_direccion_compania_seguro',
    'p_telefono_compania_seguro',
    'p_estado_compania_seguro',
    'p_correo_compania_seguro',
    'opciones',
  ];

  datoContactos = signal<IContactoCompania[]>([]);
  displayedColumnsContactos: string[] = [
    'index',
    'p_nombre_ejecutivo_cia',
    'p_correo_ejecutivo_cia',
    'p_estado_ejecutivo_cia',
    'opciones',
  ];

  datoTiposSeguro = signal<ITipoSeguroCompania[]>([]);
  displayedColumnsTiposSeguro: string[] = [
    'index',
    'p_nombre_rubro',
    'p_nombre_tipo_seguro',
    'p_estado_tipo_seguro',
    'opciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = computed(() => {
    const tabla = new MatTableDataSource<ICompaniaSeguro>(this.datoCompanias());
    tabla.paginator = this.paginator;
    tabla.sort = this.sort;
    return tabla;
  });

  dataSourceContactos = computed(() => {
    const tabla = new MatTableDataSource<IContactoCompania>(
      this.datoContactos()
    );
    return tabla;
  });

  dataSourceTiposSeguro = computed(() => {
    return new MatTableDataSource<ITipoSeguroCompania>(this.datoTiposSeguro());
  });

  ngOnInit() {
    this.rescataLista();
  }

  rescataLista() {
    const filtro = { p_id_usuario: 'adm001', p_tipo_usuario: 'A' };
    this.companiaService.postListadoCompania(filtro).subscribe({
      next: (dato: DatosCompaniaSeguro) => {
        if (dato.codigo === 200) {
          this.datoCompanias.set(dato.p_cursor);
        } else {
          this.notificacioAlertnService.error('ERROR', dato.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }

  cargarContactos(idCompania: number) {
    const filtroContactos = {
      p_id_usuario: 'adm001',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: idCompania,
    };

    this.companiaService.postListadoContactos(filtroContactos).subscribe({
      next: (dato: DatosContactoCompania) => {
        if (dato.codigo === 200) {
          this.datoContactos.set(dato.p_cursor);
        } else {
          this.notificacioAlertnService.error('ERROR', dato.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });

    this.cargarTiposSeguro(idCompania);
  }

  cargarTiposSeguro(idCompania: number) {
    const filtro = {
      p_id_usuario: 'adm001',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: idCompania,
    };

    this.companiaService.postListadoTipoSeguroCompania(filtro).subscribe({
      next: (dato: DatosTipoSeguroCompania) => {
        if (dato.codigo === 200) {
          this.datoTiposSeguro.set(dato.p_cursor);
        } else {
          this.notificacioAlertnService.error('ERROR', dato.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }

  agregaNuevaCompania() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {};

    this.dialog
      .open(AgregaCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  agregaNuevoContacto() {
    if (!this.selectedCompaniaId) {
      this.notificacioAlertnService.error(
        'ERROR',
        'Debe seleccionar una compañía antes de agregar un contacto'
      );
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {
      idCompania: this.selectedCompaniaId,
    };

    this.dialog
      .open(AgregaContactoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado' && this.selectedCompaniaId !== null) {
          this.cargarContactos(this.selectedCompaniaId);
        }
      });
  }

  agregaNuevoTipoSeguro() {
    if (!this.selectedCompaniaId) {
      this.notificacioAlertnService.error(
        'ERROR',
        'Debe seleccionar una compañía antes de agregar tipo de seguro'
      );
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = { idCompania: this.selectedCompaniaId };

    this.dialog
      .open(AgregaTiposeguroComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado' && this.selectedCompaniaId !== null) {
          this.cargarTiposSeguro(this.selectedCompaniaId);
        }
      });
  }

  modificaCompania(data: ICompaniaSeguro) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = data;

    this.dialog
      .open(ModificaCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((resp) => {
        if (resp === 'modificado') {
          this.rescataLista();
        }
      });
  }

  modificaContacto(data: IContactoCompania) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {
      ...data,
      idCompania: this.selectedCompaniaId,
    };

    this.dialog
      .open(ModificaContactoComponent, dialogConfig)
      .afterClosed()
      .subscribe((resp) => {
        if (resp === 'modificado' && this.selectedCompaniaId !== null) {
          this.cargarContactos(this.selectedCompaniaId);
        }
      });
  }

  modificaTipoSeguro(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = {
      ...data,
      p_id_compania_seguro: this.selectedCompaniaId,
    };

    this.dialog
      .open(ModificaTiposeguroComponent, dialogConfig)
      .afterClosed()
      .subscribe((resp) => {
        if (resp === 'modificado' && this.selectedCompaniaId !== null) {
          this.cargarTiposSeguro(this.selectedCompaniaId);
        }
      });
  }
}
