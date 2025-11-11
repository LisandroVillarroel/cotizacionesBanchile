import { CommonModule } from '@angular/common';
import { Component, input, inject, OnInit, signal, ViewChild, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IGestionCotizacion } from '@features/gestion-cotizaciones/gestionCotizacion-interface';
import { IRubro } from '@shared/modelo/rubro-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';

import { RubroService } from '@shared/service/rubro.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';

@Component({
  selector: 'app-firma-pendiente',
  templateUrl: './firma-pendiente.component.html',
  styleUrls: ['./firma-pendiente.component.css'],
  standalone: true,
  imports: [
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
})
export class FirmaPendienteComponent {
  pendientes = input.required<IGestionCotizacion[] | undefined>();

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  datoRubros = signal<IRubro[]>([]);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);

  pagina = signal(0);
  pageSize = 4;
  filtroContratante = signal('');
  filtroRubro = signal('');
  filtroTipoSeguro = signal('');
  filtroSolicitud = signal('');

  formularioModificado = signal(false);

  contratante = new FormControl();
  rubro = new FormControl();
  seguro = new FormControl();
  solicitud = new FormControl();

  filtroFormulario = signal<FormGroup>(new FormGroup({
    contratante : this.contratante,
    rubro : this.rubro,
    seguro : this.seguro,
    solicitud : this.solicitud
    })
  );

  datosFiltrados() {
    const contratante = this.filtroFormulario().value.contratante??'';
    const rubro = this.filtroFormulario().value.rubro?.nombre_rubro??'';
    const tipoSeguro = this.filtroFormulario().value.seguro??'';
    const solicitud = this.filtroFormulario().value.solicitud??'';

    this.formularioModificado();
    return this.pendientes()!.filter(item => {
      const cumpleContratante = item.p_nombre_contratante?.toLowerCase().includes(contratante.toLowerCase());
      const cumpleRubro = item.p_nombre_rubro.toLowerCase()?.includes( rubro.toLowerCase());
      const cumpleTipoSeguro = item.p_nombre_tipo_seguro?.includes(tipoSeguro);
      const cumpleSolicitud = item.p_id_Solicitud?.toString().toLowerCase().includes(solicitud.toString().toLowerCase());

      return  cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleSolicitud;
    });
  };

  datosPaginados(){
      const start = this.pagina() * this.pageSize;
      return this.datosFiltrados()!.slice(start, start + this.pageSize);
  }

  onPage(event: any) {
    this.pagina.set(event.pageIndex);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private matPaginatorIntl = inject(MatPaginatorIntl);

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.cargaRubros();
    this.limpiaFiltros();
    this.formularioModificado.set(true);
    this.filtroFormulario().valueChanges.subscribe(() => {
      this.datosFiltrados()
      this.datosPaginados()
    });
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
        }
      }
    });
  }

  seleccionaRubro(datos: IRubro) {
    const _codigoRubro = datos.id_rubro;
    const estructura_codigoRubro = { p_id_rubro: _codigoRubro };
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.rescatadoSeguro.set(dato.c_TipoSeguros);
          }
        }
      });
  }

  limpiaFiltros() {
    this.filtroFormulario().reset();
  }

  getCellClass(value: string): string {
    var salida = 'gris';
    if(value !== null){
      switch(value.toLowerCase()){
        case 'v':
          salida = 'verde' ; break;
        case 'a':
          salida = 'amarillo'; break;
        case 'r':
          salida = 'rojo'; break;
        default: salida = 'black'; break;
      }
    }
    return salida;
  }

  private readonly dialog = inject(MatDialog);
  retorno = output<boolean>();

  verPropuesta(IdSolicitud: number) {
/*     const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
      .open(VerPropuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => { this.retorno.emit(true); })*/
  }

  private readonly dialogCarga = inject(MatDialog);
  retornoCarga = output<boolean>();
  cargarPropuesta(IdSolicitud: number) {
/*     const dialogConfig = new MatDialogConfig();
  verPropuesta(IdSolicitud: number) {
/*     const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
      .open(VerPropuestaComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => { this.retorno.emit(true); })*/
  }
}
