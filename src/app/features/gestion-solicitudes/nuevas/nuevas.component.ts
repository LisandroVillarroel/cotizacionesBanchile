import { Component, ViewChild, inject, signal, NgModule, computed, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { ISolicitudG} from '@features/gestion-solicitudes/gestionSolicitud-interface';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { RubroService } from '@shared/service/rubro.service';
import { IRubro, InterfazRubro } from '@shared/modelo/rubro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ITipoSeguro, InterfazTipoSeguro } from '@shared/modelo/tipoSeguro-interface';

@Component({
  selector: 'app-nuevas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './nuevas.component.html',
  styleUrl: './nuevas.component.css'
})

export class NuevasComponent {
  inSolicitudes = input.required<ISolicitudG[] | undefined>();
  solicitudes = computed(() => { return this.inSolicitudes() } );

  panelOpenState = false;

  rubroService = inject(RubroService);
  datoRubros = signal<IRubro[]>([]);
  rubro = new FormControl();

  tipoSeguroService = inject(TipoSeguroService);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);
  seguro = new FormControl();

  hoy = new FormControl<Date>(new Date());

  pagina = signal(0);
  pageSize = 5;

  filtroContratante = signal('');
  filtroRubro = signal('');
  filtroProducto = signal('');
  filtroFecha = signal('');

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    //this.dataSolicitud()= this.datosSolicitud();
    //this.dataSourceSolicitud.data = this.datosSolicitud();
    this.cargaRubros();
    this.limpiaFiltros();
  }

  @ViewChild('inContratante') inputElement: any;
  @ViewChild(MatPaginator) paginatorSolicitud!: MatPaginator;

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datosFiltrados = computed(() =>
    this.solicitudes()!.filter(r =>
      r['Contratante']?.toLowerCase().includes(this.filtroContratante().toLowerCase()) &&
      r['Rubro']?.toLowerCase().includes(this.filtroRubro().toLowerCase()) &&
      r['TipoSeguro']?.toLowerCase().includes(this.filtroProducto().toLowerCase()) &&
      (new Date(r['Fecha']?.toString())).toLocaleDateString('es-BO').toString().includes(this.filtroFecha())
    )
  );

  datosPaginados = computed(() => {
    const start = this.pagina() * this.pageSize;
    return this.datosFiltrados()!.slice(start, start + this.pageSize);
  });

  onPage(event: any) {
    this.pagina.set(event.pageIndex);
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
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

  seleccionaRubro(datos: IRubro) {
    const _codigoRubro = datos.id_rubro;
    const estructura_codigoRubro = { p_id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.rescatadoSeguro.set(dato.c_TipoSeguros);
          } else {
            if (dato.codigo != 500) {
              console.log('Error:',dato.mensaje);
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
seleccionaFecha() {
    this.filtroFecha.set(this.hoy.value!.toLocaleDateString('es-BO').toString());
}

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();
    this.hoy.reset();
    //this.dataSolicitud.set(this.datosSolicitud);
    this.filtroContratante.set('');
    this.filtroRubro.set('');
    this.filtroProducto.set('');
    this.filtroFecha.set('');
  }

  getCellClass(value: number): string {
    if(value <= 1){
      return 'verde' ;
    }else if (value <= 2) {
      return 'amarillo';
    }else{
        return 'rojo';
    }
  }

  verDetalle(IdSolicitud: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
        .open(DetalleSolicitudComponent, dialogConfig)
        .afterClosed()
    }
}
