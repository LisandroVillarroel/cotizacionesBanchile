import { CompaniasContactadasComponent } from './../../detalle-solicitud/companias-contactadas/companias-contactadas.component';
import { Component, inject, Inject, signal } from '@angular/core';
import CabeceraPopupComponente from "../../../shared/ui/cabeceraPopup.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatCard, MatCardContent, MatCardActions, MatCardHeader } from "@angular/material/card";
import { MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AprobarCotizacionComponent, AprobarCotizacionData } from '../aprobar-cotizacion/aprobar-cotizacion.component';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { InformacionGeneralComponent } from '@features/detalle-solicitud/informacion-general/informacion-general.component';
import { MatIconButton } from '@angular/material/button';


@Component({
  selector: 'app-detalle-cotizacion',
  standalone: true,
  imports: [CabeceraPopupComponente, MatDialogContent, MatCard, MatCardContent,
    MatLabel, MatIcon, MatDivider, MatCardActions, ReactiveFormsModule, MatCardHeader,MatDivider],
  templateUrl: './detalle-cotizacion.component.html',
  styleUrl: './detalle-cotizacion.component.css'
})
export class DetalleCotizacionComponent {
constructor(
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<AprobarCotizacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: InformacionGeneralComponent
    ) { }


  compania = new FormControl<number | null>(null, Validators.required);
  notificacioAlertnService = inject(NotificacioAlertnService);
 detalleCotizacion = signal<FormGroup>(
    new FormGroup({
      compania: this.compania,
    })
  );






   cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  // aprobar(): void {

  //   this.apruebaCotRequest = {
  //     p_id_solicitud: this.data.solicitudId,
  //     p_id_compania_seguro:this.data.idCia,
  //     p_id_usuario: this.idUsuario,
  //     p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
  //   };
  //   console.log('boton aprobar',this.apruebaCotRequest.p_id_compania_seguro)
  //   this.apruebaCotService
  //     .postApruebaCotizacion(this.apruebaCotRequest)
  //     .subscribe({
  //       next: (dato) => {
  //         if (dato.codigo === 200) {
  //           this.confirmar();
  //         }
  //       },
  //       error: (error) => {
  //         this.notificacioAlertnService.error('ERROR','Error Inesperado');
  //       },
  //     });
  // }

async confirmar(){
    const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
              "La cotizacíon ha sido aprobada exitosamente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

  // getErrorMessage() {
  //   return this.motivo.hasError('required')
  //   ? 'Debe ingresar el motivo de devolución.' : '';
  // }
}
