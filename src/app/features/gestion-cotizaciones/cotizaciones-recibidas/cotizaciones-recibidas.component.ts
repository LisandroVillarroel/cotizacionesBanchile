import { Component, computed, input, output, inject } from '@angular/core';
import { IGestionCotizacion } from '../gestionCotizacion-interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-cotizaciones-recibidas',
  standalone: true,
  imports: [],
  templateUrl: './cotizaciones-recibidas.component.html',
  styleUrl: './cotizaciones-recibidas.component.css'
})
export class CotizacionesRecibidasComponent {
  recibidas = input.required<IGestionCotizacion[] | undefined>();
  cotRecibidas = computed(()=> this.recibidas());

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
