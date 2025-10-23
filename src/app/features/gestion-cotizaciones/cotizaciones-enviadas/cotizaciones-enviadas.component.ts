import { Component, computed, input, output, inject } from '@angular/core';
import { IGestionCotizacion } from '../gestionCotizacion-interface';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-cotizaciones-enviadas',
  standalone: true,
  imports: [],
  templateUrl: './cotizaciones-enviadas.component.html',
  styleUrl: './cotizaciones-enviadas.component.css'
})
export class CotizacionesEnviadasComponent {
  enviadas = input.required<IGestionCotizacion[] | undefined>();
  cotEnviadas = computed(()=> this.enviadas());

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
