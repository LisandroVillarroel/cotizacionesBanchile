
import { Component, input, inject, signal, ViewChild, output } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';

import { ISolicitudG } from '../gestionSolicitud-interface';
import { IRubro } from '@shared/modelo/rubro-interface';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { RubroService } from '@shared/service/rubro.service';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';


@Component({
  selector: 'app-solicitudes',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes = input.required<ISolicitudG[] | undefined>();

  rubroService = inject(RubroService);
  tipoSeguroService = inject(TipoSeguroService);
  datoRubros = signal<IRubro[]>([]);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);

  pagina = signal(0);
  pageSize = 4;
  filtroContratante = signal('');
  filtroRubro = signal('');
  filtroTipoSeguro = signal('');
  filtroFecha = signal<Date | null>(null);

  formularioModificado = signal(false);

  contratante = new FormControl();
  rubro = new FormControl();
  seguro = new FormControl();
  fecha = new FormControl<Date | null>(null);


  filtroFormulario = signal<FormGroup>(new FormGroup({
    contratante : this.contratante,
    rubro : this.rubro,
    seguro : this.seguro,
    fecha : this.fecha
    })
  );

  datosFiltrados() {
    const contratante = this.filtroFormulario().value.contratante??'';
    const rubro = this.filtroFormulario().value.rubro?.nombre_rubro??'';
    const tipoSeguro = this.filtroFormulario().value.seguro??'';

    let fechaInicio_Inicial=this.filtroFormulario().value.fecha;

    let fechaInicio=new Date();
    if (fechaInicio_Inicial!=null){
         fechaInicio = new Date(this.filtroFormulario().value.fecha);
    }

    this.formularioModificado();
    return this.solicitudes()!.filter(item => {
      const cumpleContratante = item.nombre_contratante?.toLowerCase().includes(contratante.toLowerCase());
      const cumpleRubro = item.nombre_rubro.toLowerCase()?.includes( rubro.toLowerCase());
      const cumpleTipoSeguro = item.descripcion_tipo_seguro?.includes(tipoSeguro);
      let cumpleFecha=true;
      const fechaBase = new Date(item.fecha_creacion);

      if (fechaInicio_Inicial!=null){
        cumpleFecha = !fechaInicio || (
        fechaBase.getFullYear() === fechaInicio.getFullYear() &&
        fechaBase.getMonth() === fechaInicio.getMonth() &&
        fechaBase.getDate() === fechaInicio.getDate()
      );
    }
    return  cumpleContratante && cumpleRubro && cumpleTipoSeguro && cumpleFecha;
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

  private readonly dialog = inject(MatDialog);
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
    const _codigoRubro = datos.p_id_rubro;
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

  retorno = output<boolean>();

  verDetalle(IdSolicitud: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = {
      idSolicitud: IdSolicitud,
      flagSoloCerrar: false
    };
    dialogConfig.data = {
      idSolicitud: IdSolicitud,
      flagSoloCerrar: false
    };
    this.dialog
      .open(DetalleSolicitudComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => { this.retorno.emit(true); })
  }
}
