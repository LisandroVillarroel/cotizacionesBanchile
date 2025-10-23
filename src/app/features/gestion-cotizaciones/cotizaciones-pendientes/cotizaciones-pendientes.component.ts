import { Component, computed, input, inject, output } from '@angular/core';
import { IGestionCotizacion } from '../gestionCotizacion-interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-cotizaciones-pendientes',
  standalone: true,
  imports: [],
  templateUrl: './cotizaciones-pendientes.component.html',
  styleUrl: './cotizaciones-pendientes.component.css'
})
export class CotizacionesPendientesComponent {
  pendientes = input.required<IGestionCotizacion[] | undefined>();
  cotPenditentes = computed(()=> this.pendientes());

  private readonly dialog = inject(MatDialog);
  retorno = output<boolean>();
  verDetalle(IdSolicitud: number) {
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
      .subscribe(() => { this.retorno.emit(true); })
  }
}
