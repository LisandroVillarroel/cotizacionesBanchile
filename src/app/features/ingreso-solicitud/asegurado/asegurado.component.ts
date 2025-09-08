import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { AgregaSolicitudAseguradoComponent } from './agrega-solicitud-asegurado/agrega-solicitud-asegurado.component';
import { ModificaSolicitudAseguradoComponent } from './modifica-solicitud-asegurado/modifica-solicitud-asegurado.component';
import { ConsultaSolicitudAseguradoComponent } from './consulta-solicitud-asegurado/consulta-solicitud-asegurado.component';
import { EliminaSolicitudAseguradoComponent } from './elimina-solicitud-asegurado/elimina-solicitud-asegurado.component';
import { ISolicitudAsegurado } from '../modelo/ingreso-solicitud';

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
export class AseguradoComponent {
  public nombreArchivoAsegurado = 'Asegurados';
  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoAsegurados = signal<ISolicitudAsegurado[]>([
    {
      rutAsegurado: '12514508-6',
      nombreAsegurado: 'Nombre Asegurado 1',
      apellidoPaternoAsegurado: 'Apellido Paterno 1',
      apellidoMaternoAsegurado: 'Apellido Materno 1',
      regionAsegurado: 'Metropolitana 1',
      ciudadAsegurado: 'Santiago 1',
      comunaAsegurado: 'Maipú 1',
      direccionAsegurado: 'Dirección  1',
      telefonoAsegurado: '11111111',
      correoAsegurado: 'correo1@gmail.com',
    },
    {
      rutAsegurado: '14245328-2',
      nombreAsegurado: 'Nombre Asegurado 2',
      apellidoPaternoAsegurado: 'Apellido Paterno 2',
      apellidoMaternoAsegurado: 'Apellido Materno 2',
      regionAsegurado: 'Metropolitana 2',
      ciudadAsegurado: 'Santiago 2',
      comunaAsegurado: 'Maipú 2',
      direccionAsegurado: 'Dirección  2',
      telefonoAsegurado: '2222222222',
      correoAsegurado: 'correo2@gmail.com',
    },
  ]);

  displayedColumnsAsegurado: string[] = [
    'index',
    'rutAsegurado',
    'nombreAsegurado',
    //'apellidoPaternoAsegurado',
    //'apellidoMaternoAsegurado',
    //'regionAsegurado',
    //'ciudadAsegurado',
    //'comunaAsegurado',
    //'direccionAsegurado',
    'telefonoAsegurado',
    'correoAsegurado',
    'opciones',
  ];
  dataSourceAsegurado = new MatTableDataSource<ISolicitudAsegurado>();

  @ViewChild(MatPaginator)
  paginatorAsegurado!: MatPaginator;
  @ViewChild(MatSort) sortAsegurado!: MatSort;

  applyFilterAsegurado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAsegurado.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAsegurado.paginator) {
      this.dataSourceAsegurado.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSourceAsegurado.paginator = this.paginatorAsegurado;
    this.dataSourceAsegurado.sort = this.sortAsegurado;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceAsegurado.data = this.datoAsegurados();
  }

  agregaNuevoAsegurado() {
    //  agregaNuevo(empresaInterface_: EmpresaI) {
    // Nuevo
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {};
    //  dialogConfig.data = {
    //    idProducto: idProdP,
    //    titulo: tituloP
    //  };

    this.dialog
      .open(AgregaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableAsegurado();
        }
      });
  }

  modificaAsegurado(datoAseguradoPar: ISolicitudAsegurado): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoAseguradoPar;
    this.dialog
      .open(ModificaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableAsegurado();
        }
      });
  }

  consultaAsegurado(datoAseguradoPar: ISolicitudAsegurado) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoAseguradoPar;
    this.dialog
      .open(ConsultaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableAsegurado();
        }
      });
  }

  eliminaAsegurado(datoAseguradoPar: ISolicitudAsegurado) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoAseguradoPar;
    this.dialog
      .open(EliminaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableAsegurado();
        }
      });
  }

  async refreshTableAsegurado() {
    // await this.getListCliente();
    this.dataSourceAsegurado.paginator?.pageSize !=
      this.paginatorAsegurado.pageSize;
  }
}
