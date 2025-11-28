import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import {
  DatosCompaniaSeguroLista,
  ICompaniaSeguroLista,
} from './compania-Interface';
import { CompaniaService } from './compania.service';
import { ModificaCompaniaComponent } from './modifica-compania/modifica-compania.component';
import { ConsultaCompaniaComponent } from './consulta-compania/consulta-compania.component';
// import { EliminaCompaniaComponent } from './elimina-compania/elimina-compania.component';
import { AgregaCompaniaComponent } from './agrega-compania/agrega-compania.component';

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
  ],
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.css'],
})
export default class CompaniasComponent {
  notificacioAlertnService = inject(NotificacioAlertnService);
  companiaService = inject(CompaniaService);
  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoCompanias = signal<ICompaniaSeguroLista[]>([]);

  displayedColumns: string[] = [
    'index',
    'p_rut_compania_seguro',
    'p_nombre_compania_seguro',
    'p_direccion_compania_seguro',
    'p_telefono_compania_seguro',
    'p_estado_compania_seguro',
    'p_correo_compania_seguro',
    'opciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = computed(() => {
    const tabla = new MatTableDataSource<ICompaniaSeguroLista>(
      this.datoCompanias()
    );
    tabla.paginator = this.paginator;
    tabla.sort = this.sort;
    return tabla;
  });

  ngAfterViewInit(): void {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  async ngOnInit() {
    this.rescataLista();
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
    if (this.dataSource().paginator) {
      this.dataSource().paginator!.firstPage();
    }
  }

  rescataLista() {
    const filtro = {
      p_id_usuario: 'ADM042', // Parametrizable
      p_tipo_usuario: 'A',
    };

    this.companiaService.postListadoCompania(filtro).subscribe({
      next: (dato: DatosCompaniaSeguroLista) => {
        if (dato.codigo === 200) {
          console.log('Lista de Compañías:', dato.p_cursor);
          this.datoCompanias.set(dato.p_cursor);
        } else {
          this.notificacioAlertnService.error('ERROR', dato.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
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

    this.dialog
      .open(AgregaCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataLista();
        }
      });
  }

  modificaCompania(datoCompania: ICompaniaSeguroLista) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoCompania;

    this.dialog
      .open(ModificaCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          this.rescataLista();
        }
      });
  }

  /* eliminaCompania(datoCompania: ICompaniaSeguroLista) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoCompania;

    this.dialog
      .open(EliminaCompaniaComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataLista();
        }
      });
  } */

  consultaCompania(datoCompania: ICompaniaSeguroLista) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {
      id_compania_seguro: datoCompania.p_id_compania_seguro,
    };

    this.dialog.open(ConsultaCompaniaComponent, dialogConfig);
  }
}
