import { Component, Inject, inject, signal } from '@angular/core';
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
//import { SolicitudDevueltaComponent } from './solicitud-devuelta/solicitud-devuelta.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { DevolverSolicitudService } from './devolver-solicitud.service';
import { IDevuelveRequest } from './devolver-interface';

export interface DevolverConObservacionesData {
  [x: string]: any;
  solicitudId: number;
  fecha: string;
  ejecutivo: string;
  //motivoDevolucion: string;
}

@Component({
  selector: 'app-devolver-solicitud',
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
  templateUrl: './devolver-solicitud.component.html',
  styleUrl: './devolver-solicitud.component.css'
})

  export class DevolverSolicitudComponent {
    constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DevolverSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DevolverConObservacionesData
  ) {}

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;
  devolverService = inject(DevolverSolicitudService);
  devolverRequest!: IDevuelveRequest;
  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  devolver(motivo: string): void {
    this.devolverRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.idUsuario,
      p_tipo_usuario: this.idUsuario.substring(0,1),
      p_observacion: motivo
    };
    this.devolverService
      .postDevuelveSolicitud(this.devolverRequest)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Devolvió Bien');
          } else {
            if (dato.codigo != 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
              alert('Error:' + dato.mensaje);
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      //Ajustes clave para evitar espacio en blanco
      dialogConfig.width = '600px'; // Tamaño fijo y controlado
      dialogConfig.maxHeight = '90vh'; // Altura máxima visible
      dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
      dialogConfig.data = this.devolverRequest;

/*       this.dialog
        .open(SolicitudDevueltaComponent, dialogConfig)
        .afterClosed(); */
    }

}
