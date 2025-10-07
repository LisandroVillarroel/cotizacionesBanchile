/* import { Component, Inject, inject, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from "@angular/material/divider";
import { SolicitudDevueltaComponent } from './solicitud-devuelta/solicitud-devuelta.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StorageService } from '@shared/service/storage.service';

export interface DevolverConObservacionesData {
[x: string]: any;
  solicitudId: string;
  fecha: string;
  ejecutivo: string;
  motivoDevolucion: string;

}
@Component({
  selector: 'app-devolver-con-observaciones',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatDivider,
    MatTooltipModule,
  ],
  templateUrl: './devolver-con-observaciones.component.html',
  styleUrl: './devolver-con-observaciones.component.css'
})

  export class DevolverConObservacionesComponent {
    constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DevolverConObservacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) {}

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;
  anularService = inject(AnularSolicitudService);
  anulaRequest!: IAnulaRequest;
  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close('confirmado');
  }

  devolverConObs(): void {
      const dato = {
        solicitudId: this.data.solicitudId,
        fecha: this.data.fecha,
        ejecutivo: this.data.ejecutivo,
        // rutContratante: '00.000.000-0',
        // nomContratante: 'Devolver con Observaciones',
        // rubro: 'VIDA',
        //rutContratante: this.data.fecha
      };


      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      //Ajustes clave para evitar espacio en blanco
      dialogConfig.width = '600px'; // Tamaño fijo y controlado
      dialogConfig.maxHeight = '90vh'; // Altura máxima visible
      dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
      dialogConfig.data = dato;

      this.dialog
        .open(SolicitudDevueltaComponent, dialogConfig)
        .afterClosed();
    }

  observaciones: string = '';
}
 */
