import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IAseguradoLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-consulta-asegurado',
  standalone: true,
  imports: [MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
CabeceraPopupComponente],
  templateUrl: './consulta-asegurado.component.html',
  styleUrl: './consulta-asegurado.component.css'
})
export class ConsultaAseguradoComponent {
private readonly dialogRef = inject(MatDialogRef<ConsultaAseguradoComponent>);
  public readonly data = inject<IAseguradoLista>(MAT_DIALOG_DATA);
}
