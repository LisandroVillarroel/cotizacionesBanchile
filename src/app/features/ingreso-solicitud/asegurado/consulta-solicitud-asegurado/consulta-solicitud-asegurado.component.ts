import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IAsegurado, IAseguradoLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-consulta-solicitud-asegurado',
  standalone: true,
  imports: [MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
CabeceraPopupComponente],
  templateUrl: './consulta-solicitud-asegurado.component.html',
  styleUrl: './consulta-solicitud-asegurado.component.css'
})
export class ConsultaSolicitudAseguradoComponent {
private readonly dialogRef = inject(MatDialogRef<ConsultaSolicitudAseguradoComponent>);
  public readonly data = inject<IAseguradoLista>(MAT_DIALOG_DATA);
}
