import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ISolicitudAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';

@Component({
  selector: 'app-consulta-solicitud-asegurado',
  standalone: true,
  imports: [MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,],
  templateUrl: './consulta-solicitud-asegurado.component.html',
  styleUrl: './consulta-solicitud-asegurado.component.css'
})
export class ConsultaSolicitudAseguradoComponent {
private readonly dialogRef = inject(MatDialogRef<ConsultaSolicitudAseguradoComponent>);
  public readonly data = inject<ISolicitudAsegurado>(MAT_DIALOG_DATA);
}
