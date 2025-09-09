import { Component, effect, inject, input, model, output, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
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
import { ISolicitudAsegurado } from '../../../shared/modelo/ingreso-solicitud';


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
  datoAseguradosRecibe =  input.required<ISolicitudAsegurado[] | undefined>();
  datoAseguradosRecibeModificado = output<ISolicitudAsegurado[]>();
  flagAsegurado= model(false);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);


  displayedColumnsAsegurado: string[] = [
    'index',
    'rutAsegurado',
    'nombreAsegurado',
    'apellidoPaternoAsegurado',
    'apellidoMaternoAsegurado',
    'regionAsegurado',
    'ciudadAsegurado',
    'comunaAsegurado',
    'direccionAsegurado',
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


    efe=effect(() => {
      console.log('datos asegurado:',this.datoAseguradosRecibe()!)
      this.dataSourceAsegurado.data = this.datoAseguradosRecibe()!;
     // this.dataSourceAsegurado.paginator?.pageSize !=
     // this.paginatorAsegurado.pageSize;
     console.log('flag asegurado 1:',this.flagAsegurado())
      if (this.datoAseguradosRecibe()!.length===0)
        this.flagAsegurado.set(false);
      else
        this.flagAsegurado.set(true);
console.log('flag aseguradoooooo:')
      console.log('flag asegurado:',this.flagAsegurado())
    })

  ngAfterViewInit(): void {
    this.dataSourceAsegurado.paginator = this.paginatorAsegurado;
    this.dataSourceAsegurado.sort = this.sortAsegurado;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
   // this.dataSourceAsegurado.data = this.datoAseguradosRecibe();

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

    this.dialog
      .open(AgregaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data !== '') {
          const arregloActualizado =[...this.datoAseguradosRecibe()!,data]; // Copia y agrega un elemento
         this.datoAseguradosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado

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
        if (data !== '') {
        const    arregloActualizado =[...this.datoAseguradosRecibe()!.filter(valor=> valor.rutAsegurado!=datoAseguradoPar.rutAsegurado),data]; // Copia y agrega un elemento
         this.datoAseguradosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado
        }
        }
      );
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
        if (data === 1) {
          const arregloActualizado = this.datoAseguradosRecibe()!.filter(valor=> valor.rutAsegurado!=datoAseguradoPar.rutAsegurado); // Copia y agrega un elemento
         console.log('datos agregados hijo:',arregloActualizado)
         this.datoAseguradosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado
        }
      });
  }

}
