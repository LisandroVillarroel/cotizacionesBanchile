import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { AgregaSolicitudBeneficiarioComponent } from './agrega-solicitud-beneficiario/agrega-solicitud-beneficiario.component';
import { ModificaSolicitudBeneficiarioComponent } from './modifica-solicitud-beneficiario/modifica-solicitud-beneficiario.component';
import { ConsultaSolicitudBeneficiarioComponent } from './consulta-solicitud-beneficiario/consulta-solicitud-beneficiario.component';
import { EliminaSolicitudBeneficiarioComponent } from './elimina-solicitud-beneficiario/elimina-solicitud-beneficiario.component';
import { ISolicitudBeneficiario } from '../modelo/ingreso-solicitud';

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
  public nombreArchivoBeneficiario = 'Beneficiario';
  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datoBeneficiarios = signal<ISolicitudBeneficiario[]>([
    {
      rutBeneficiario: '12514508-6',
      nombreBeneficiario: 'Nombre Beneficiario 1',
      apellidoPaternoBeneficiario: 'apellido Paterno 1',
      apellidoMaternoBeneficiario: 'apellido Materno 1',
      regionBeneficiario: 'Metropolitana 1',
      ciudadBeneficiario: 'Santiago 1',
      comunaBeneficiario: 'maipú 1',
      direccionBeneficiario: 'dirección  1',
      telefonoBeneficiario: '11111111',
      correoBeneficiario: 'correo1@gmail.com',
    },
    {
      rutBeneficiario: '14245328-2',
      nombreBeneficiario: 'Nombre Beneficiario 2',
      apellidoPaternoBeneficiario: 'apellido Paterno 2',
      apellidoMaternoBeneficiario: 'apellido Materno 2',
      regionBeneficiario: 'Metropolitana 2',
      ciudadBeneficiario: 'Santiago 2',
      comunaBeneficiario: 'maipú 2',
      direccionBeneficiario: 'dirección  2',
      telefonoBeneficiario: '2222222222',
      correoBeneficiario: 'correo2@gmail.com',
    },
  ]);

  displayedColumnsBeneficiario: string[] = [
    'index',
    'rutBeneficiario',
    'nombreBeneficiario',
    'apellidoPaternoBeneficiario',
    'apellidoMaternoBeneficiario',
    'regionBeneficiario',
    'ciudadBeneficiario',
    'comunaBeneficiario',
    'direccionBeneficiario',
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

  ngAfterViewInit(): void {
    this.dataSourceBeneficiario.paginator = this.paginatorBeneficiario;
    this.dataSourceBeneficiario.sort = this.sortBeneficiario;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSourceBeneficiario.data = this.datoBeneficiarios();
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
    //  dialogConfig.data = {
    //    idProducto: idProdP,
    //    titulo: tituloP
    //  };

    this.dialog
      .open(AgregaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
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
        console.log('Dialog output3333:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
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
      .subscribe((data) => {
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
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
        console.log('Datoas Consulta:', data);
        if (data === 1) {
          this.refreshTableBeneficiario();
        }
      });
  }

  async refreshTableBeneficiario() {
    // await this.getListCliente();
    this.dataSourceBeneficiario.paginator?.pageSize !=
      this.paginatorBeneficiario.pageSize;
  }
}
