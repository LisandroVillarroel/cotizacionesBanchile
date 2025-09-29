import {
  Component,
  computed,
  inject,
  model,
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
import { AgregaSolicitudBeneficiarioComponent } from './agrega-solicitud-beneficiario/agrega-solicitud-beneficiario.component';
import { ModificaSolicitudBeneficiarioComponent } from './modifica-solicitud-beneficiario/modifica-solicitud-beneficiario.component';
import { ConsultaSolicitudBeneficiarioComponent } from './consulta-solicitud-beneficiario/consulta-solicitud-beneficiario.component';
import { EliminaSolicitudBeneficiarioComponent } from './elimina-solicitud-beneficiario/elimina-solicitud-beneficiario.component';
import {
  DatosBeneficiariosInterface,
  IBeneficiario,
  IBeneficiarioLista,
} from '../modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '../service/beneficiario.service';

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
  datoBeneficiarios = signal<IBeneficiarioLista[]>([]);

  flagBeneficiario = model(false);

  beneficiarioService = inject(BeneficiarioService);

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  displayedColumnsBeneficiario: string[] = [
    'index',
    'rutBeneficiario',
    'nombreBeneficiario',
    'correoBeneficiario',
    'telefonoBeneficiario',
    'regionBeneficiario',
    'ciudadBeneficiario',
    'comunaBeneficiario',
    'direccionBeneficiario',
    'numeroDireccionBeneficiario',
    'deptoDireccionBeneficiario',
    'casaBeneficiario',
    'opciones',
  ];

  @ViewChild(MatPaginator)
  paginatorBeneficiario!: MatPaginator;
  @ViewChild(MatSort) sortBeneficiario!: MatSort;

  applyFilterBeneficiario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBeneficiario().filter = filterValue.trim().toLowerCase();

    if (this.dataSourceBeneficiario().paginator) {
      this.dataSourceBeneficiario().paginator!.firstPage();
    }
  }

  dataSourceBeneficiario = computed(() => {
    const tabla = new MatTableDataSource<IBeneficiarioLista>(
      this.datoBeneficiarios()
    );
    tabla.paginator = this.paginatorBeneficiario;
    tabla.sort = this.sortBeneficiario;
    return tabla;
  });

  ngAfterViewInit(): void {
    this.dataSourceBeneficiario().paginator = this.paginatorBeneficiario;
    this.dataSourceBeneficiario().sort = this.sortBeneficiario;
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.rescataListaBeneficiarios();
  }

  rescataListaBeneficiarios() {
    const estructura_listaBeneficiarios = {
      p_id_solicitud: 5,
    };
    this.beneficiarioService
      .postListadoBeneficiario(estructura_listaBeneficiarios)
      .subscribe({
        next: (dato: DatosBeneficiariosInterface) => {
          if (dato.codigo === 200) {
            this.datoBeneficiarios.set(dato.p_cursor);
          } else {
            if (dato.codigo != 500) {
              console.log('Error:', dato.mensaje);
            } else {
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }

  agregaNuevoBeneficiario() {
    //  agregaNuevo(empresaInterface_: EmpresaI) {
    // Nuevo
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {};

    this.dialog
      .open(AgregaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataListaBeneficiarios();
        }
      });
  }

  modificaBeneficiario(datoBeneficiarioPar: IBeneficiarioLista): void {
    console.log('Dato Modificar;', datoBeneficiarioPar);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ModificaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          console.log('Modificación Confirmada:', data);
          this.rescataListaBeneficiarios();
        }
      });
  }

  consultaBeneficiario(datoBeneficiarioPar: IBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ConsultaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed();
  }

  eliminaBeneficiario(datoBeneficiarioPar: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(EliminaSolicitudBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataListaBeneficiarios();
        }
      });
  }
}
