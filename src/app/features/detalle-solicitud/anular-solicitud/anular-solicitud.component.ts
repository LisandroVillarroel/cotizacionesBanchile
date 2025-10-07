import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { Component, Inject, inject, signal } from '@angular/core';
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
import { SolicitudAnuladaComponent } from './solicitud-anulada/solicitud-anulada.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { AnularSolicitudService } from './anular-solicitud.service';
import { IAnulaRequest } from './anular-interface';

@Component({
  selector: 'app-anular-solicitud',
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
  templateUrl: './anular-solicitud.component.html',
  styleUrl: './anular-solicitud.component.css'
})
export class AnularSolicitudComponent {
  constructor(
    public dialogRef: MatDialogRef<AnularSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleSolicitudComponent,
    private dialog: MatDialog
  ) { }

   storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  idUsuario = this._storage()?.usuarioLogin.usuario!;
  anularService = inject(AnularSolicitudService);
  anulaRequest!: IAnulaRequest;

  cerrar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  confirmar(motivo: string): void {
    this.anulaRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_usuario: this.idUsuario,
      p_tipo_usuario: this.idUsuario.substring(0,1),
      p_observacion: motivo
    };

    this.anularService
      .postAnulaSolicitud(this.anulaRequest)
      .subscribe({
        next: (dato) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            alert('Anuló Bien');
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
    dialogConfig.data = this.anulaRequest;

    this.dialog
      .open(SolicitudAnuladaComponent, dialogConfig)
      .afterClosed();
  }
}
