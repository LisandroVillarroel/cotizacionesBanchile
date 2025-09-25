import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregaSolicitudAseguradoComponent } from './agrega-solicitud-asegurado/agrega-solicitud-asegurado.component';
import { ModificaSolicitudAseguradoComponent } from './modifica-solicitud-asegurado/modifica-solicitud-asegurado.component';
import { ConsultaSolicitudAseguradoComponent } from './consulta-solicitud-asegurado/consulta-solicitud-asegurado.component';
import { EliminaSolicitudAseguradoComponent } from './elimina-solicitud-asegurado/elimina-solicitud-asegurado.component';
import { DatosAseguradosInterface, IAsegurado, IAseguradoLista } from '../modelo/ingresoSolicitud-Interface';
import { AseguradoService } from '../service/asegurado.service';


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
  datoAsegurados=signal <IAseguradoLista[]>([]);

  flagAsegurado = model(false);

  aseguradoService= inject(AseguradoService)

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumnsAsegurado: string[] = [
    'index',
    'rutAsegurado',
    'nombreRazonSocialAsegurado',
    'mailAsegurado',
    'telefonoAsegurado',
    'regionAsegurado',
    'ciudadAsegurado',
    'comunaAsegurado',
    'direccionAsegurado',
    'numeroDirAsegurado',
    'departamentoBlockAsegurado',
    'casaAsegurado',
    'opciones',
  ];
  //dataSourceAsegurado = new MatTableDataSource<ISolicitudAsegurado>();

  @ViewChild(MatPaginator)
  paginatorAsegurado!: MatPaginator;
  @ViewChild(MatSort) sortAsegurado!: MatSort;

  applyFilterAsegurado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAsegurado().filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAsegurado().paginator) {
      this.dataSourceAsegurado().paginator!.firstPage();
    }
  }

  dataSourceAsegurado=computed(()=>
  {
    const tabla =new MatTableDataSource<IAseguradoLista>(this.datoAsegurados());
    tabla.paginator = this.paginatorAsegurado;
    tabla.sort = this.sortAsegurado;
    return tabla;
}
  );
  /*
  efe = effect(() => {
    console.log('datos asegurado:', this.datoAseguradosRecibe()!);
    this.dataSourceAsegurado.data = this.datoAseguradosRecibe()!;
    // this.dataSourceAsegurado.paginator?.pageSize !=
    // this.paginatorAsegurado.pageSize;
    console.log('flag asegurado 1:', this.flagAsegurado());
    if (this.datoAseguradosRecibe()!.length === 0)
      this.flagAsegurado.set(false);
    else this.flagAsegurado.set(true);
    console.log('flag aseguradoooooo:');
    console.log('flag asegurado:', this.flagAsegurado());
  });
*/
  ngAfterViewInit(): void {
    this.dataSourceAsegurado().paginator = this.paginatorAsegurado;
    this.dataSourceAsegurado().sort = this.sortAsegurado;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.rescataListaAsegurados();
  }

  rescataListaAsegurados() {
    const estructura_listaAsegurados={
      "p_id_solicitud": "5"
    }
    this.aseguradoService.postListadoAsegurados(estructura_listaAsegurados).subscribe({
          next: (dato: DatosAseguradosInterface) => {
            if (dato.codigo === 200) {

              this.datoAsegurados.set(dato.p_cursor);
            } else {
              if (dato.codigo != 500) {
                console.log('Error:', dato.mensaje);
              } else {
                console.log('ERROR DE SISTEMA:');
              }
            }
          },
          error: (error) => {
            console.log('ERROR INESPERADO', error);
          },
        });
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
          this.rescataListaAsegurados();
        }
      });
  }

  modificaAsegurado(datoAseguradoPar: IAseguradoLista): void {

    console.log('dato modificar;',datoAseguradoPar)
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
          this.rescataListaAsegurados();
        }
      });
  }

  consultaAsegurado(datoAseguradoPar: IAsegurado) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoAseguradoPar;
    this.dialog
      .open(ConsultaSolicitudAseguradoComponent, dialogConfig)
      .afterClosed();
  }

  eliminaAsegurado(datoAseguradoPar: any) {
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
          this.rescataListaAsegurados();
        }
      });
  }
}
