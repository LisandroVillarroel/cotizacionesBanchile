import { Component, effect, inject, input, model, output, signal, ViewChild } from '@angular/core';
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
import { AgregaSolicitudBeneficiarioComponent } from './agrega-solicitud-beneficiario/agrega-solicitud-beneficiario.component';
import { ModificaSolicitudBeneficiarioComponent } from './modifica-solicitud-beneficiario/modifica-solicitud-beneficiario.component';
import { ConsultaSolicitudBeneficiarioComponent } from './consulta-solicitud-beneficiario/consulta-solicitud-beneficiario.component';
import { EliminaSolicitudBeneficiarioComponent } from './elimina-solicitud-beneficiario/elimina-solicitud-beneficiario.component';
import { ISolicitudBeneficiario } from '../modelo/ingresoSolicitud-Interface';

@Component({
  selector: 'app-beneficiario',
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
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css',
})
export class BeneficiarioComponent {
  datoBeneficiariosRecibe =  input.required<ISolicitudBeneficiario[] | undefined>();
  datoBeneficiariosRecibeModificado = output<ISolicitudBeneficiario[]>();
  flagBeneficiario= model(false);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);



  displayedColumnsBeneficiario: string[] = [
    'index',
    'rutBeneficiario',
    'nombreBeneficiario',
    //'apellidoPaternoBeneficiario',
    //'apellidoMaternoBeneficiario',
    //'regionBeneficiario',
    //'ciudadBeneficiario',
    //'comunaBeneficiario',
    //'direccionBeneficiario',
    'telefonoBeneficiario',
    'correoBeneficiario',
    'opciones',
  ];
  dataSourceBeneficiario = new MatTableDataSource<ISolicitudBeneficiario>();

  @ViewChild(MatPaginator)
  paginatorBeneficiario!: MatPaginator;
  @ViewChild(MatSort) sortBeneficiario!: MatSort;

  applyFilterBeneficiario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBeneficiario.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceBeneficiario.paginator) {
      this.dataSourceBeneficiario.paginator.firstPage();
    }
  }

   constructor() {
      effect(() => {
        this.dataSourceBeneficiario.data = this.datoBeneficiariosRecibe()!;
        this.dataSourceBeneficiario.paginator?.pageSize !=
        this.paginatorBeneficiario.pageSize;
      })
    }

  ngAfterViewInit(): void {
    this.dataSourceBeneficiario.paginator = this.paginatorBeneficiario;
    this.dataSourceBeneficiario.sort = this.sortBeneficiario;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
  }

  agregaNuevoBeneficiario() {
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
      .open(AgregaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
         if (data !== '') {
          const arregloActualizado =[...this.datoBeneficiariosRecibe()!,data]; // Copia y agrega un elemento
         this.datoBeneficiariosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado
          this.flagBeneficiario.set(true);
        }
      });
  }

  modificaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ModificaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
         if (data !== '') {
        const    arregloActualizado =[...this.datoBeneficiariosRecibe()!.filter(valor=> valor.rutBeneficiario!=datoBeneficiarioPar.rutBeneficiario),data]; // Copia y agrega un elemento
         this.datoBeneficiariosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado
          this.flagBeneficiario.set(true);
        }
      });
  }

  consultaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ConsultaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
  }

  eliminaBeneficiario(datoBeneficiarioPar: ISolicitudBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(EliminaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 1) {
          const arregloActualizado = this.datoBeneficiariosRecibe()!.filter(valor=> valor.rutBeneficiario!=datoBeneficiarioPar.rutBeneficiario); // Copia y agrega un elemento
         console.log('datos agregados hijo:',arregloActualizado)
         this.datoBeneficiariosRecibeModificado.emit(arregloActualizado); // Emite el arreglo modificado
        }
      });
  }
}
