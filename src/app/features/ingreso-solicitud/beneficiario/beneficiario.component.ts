import {
  Component,
  computed,
  effect,
  inject,
  input,
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
import {
  DatosBeneficiariosInterface,
  IBeneficiario,
  IBeneficiarioLista,
  IBeneficiarioListaParametro,
} from '../modelo/ingresoSolicitud-Interface';
import { BeneficiarioService } from '../service/beneficiario.service';
import { CommonModule } from '@angular/common';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { AgregaBeneficiarioComponent } from './agrega-beneficiario/agrega-beneficiario.component';
import { ModificaBeneficiarioComponent } from './modifica-beneficiario/modifica-beneficiario.component';
import { ConsultaBeneficiarioComponent } from './consulta-beneficiario/consulta-beneficiario.component';
import { EliminaBeneficiarioComponent } from './elimina-beneficiario/elimina-beneficiario.component';

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
    CommonModule,
  ],
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css',
})
export class BeneficiarioComponent {
  idSolicitud = input.required<number>();
  mostrarSoloConsulta = input.required<boolean>();

  notificacioAlertnService= inject(NotificacioAlertnService);

  beneficiarioService = inject(BeneficiarioService);
  datoBeneficiarios = signal<IBeneficiarioLista[]>([]);

  constructor() {
      effect(() => {
        // Llamar al método cada vez que el valor cambie
        if (this.idSolicitud() !== 0){
          this.rescataListaBeneficiarios(this.idSolicitud()!);
        }
      }, { allowSignalWrites: true });
    }

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

  AfterViewInit(): void {
    this.dataSourceBeneficiario().paginator = this.paginatorBeneficiario;
    this.dataSourceBeneficiario().sort = this.sortBeneficiario;
  }

  async OnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';

  }

  rescataListaBeneficiarios(idSolicitud: number) {

    this.beneficiarioService
      .postListadoBeneficiario(idSolicitud)
      .subscribe({
        next: (dato: DatosBeneficiariosInterface) => {
          if (dato.codigo === 200) {
            this.datoBeneficiarios.set(dato.p_cursor);
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR','No fue posible obtener el listado de beneficiarios.');
        },
      });
  }

  agregaNuevoBeneficiario() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.idSolicitud();

    this.dialog
      .open(AgregaBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'agregado') {
          this.rescataListaBeneficiarios(this.idSolicitud());
        }
      });
  }

  modificaBeneficiario(datoBeneficiarioPar: IBeneficiarioLista): void {
    console.log('Dato Modificar;', datoBeneficiarioPar);
    const dialogConfig = new MatDialogConfig();
 const parametro:IBeneficiarioListaParametro={
      datoBeneficiarioPar: datoBeneficiarioPar,
      idSolicitud: this.idSolicitud(),
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = parametro;
    this.dialog
      .open(ModificaBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'modificado') {
          //console.log('Modificación Confirmada:', data);
          this.rescataListaBeneficiarios(this.idSolicitud());
        }
      });
  }

  consultaBeneficiario(datoBeneficiarioPar: IBeneficiario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = datoBeneficiarioPar;
    this.dialog
      .open(ConsultaBeneficiarioComponent, dialogConfig)
      .afterClosed();
  }

  eliminaBeneficiario(datoBeneficiarioPar: IBeneficiarioLista) {
    const dialogConfig = new MatDialogConfig();
    const parametro:IBeneficiarioListaParametro={
      datoBeneficiarioPar: datoBeneficiarioPar,
      idSolicitud: this.idSolicitud(),
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.position = { top: '3%' };

    dialogConfig.data = parametro;
    this.dialog
      .open(EliminaBeneficiarioComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data === 'eliminado') {
          this.rescataListaBeneficiarios(this.idSolicitud());
        }
      });
  }
}
