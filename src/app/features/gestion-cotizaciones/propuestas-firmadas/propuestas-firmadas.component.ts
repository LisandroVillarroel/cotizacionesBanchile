import { Component, computed, input, output, inject } from '@angular/core';
import { IGestionCotizacion } from '../gestionCotizacion-interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-propuestas-firmadas',
  standalone: true,
  imports: [],
  templateUrl: './propuestas-firmadas.component.html',
  styleUrl: './propuestas-firmadas.component.css'
})
export class PropuestasFirmadasComponent {
  firmadas = input.required<IGestionCotizacion[] | undefined>();
  cotFirmadas = computed(()=> this.firmadas());

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
