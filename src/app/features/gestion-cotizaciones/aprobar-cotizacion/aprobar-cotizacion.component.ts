import { AprobarCotizacionService } from './aprobar-cotizacion.service';
import { Component, computed, inject, Inject, input, signal } from '@angular/core';
import CabeceraPopupComponente from "../../../shared/ui/cabeceraPopup.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef,MatDialogModule, MatDialogConfig } from "@angular/material/dialog";
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { MatLabel, MatFormField, MatHint, MatError } from "@angular/material/form-field";
import { ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IApruebaCotRequest } from './aprobar-cotizacion-interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


export interface AprobarCotizacionData {
  [x: string]: any;
  solicitudId: number;
  idCia:number;
  fecha: string;
  ejecutivo: string;
  rut_contratante:string,
  nombre_razon_social_contratante:string,
  nombre_rubro:string,
}


@Component({
  selector: 'app-aprobar-cotizacion',
  standalone: true,
  imports: [CabeceraPopupComponente
          , MatDialogContent
          , MatCard
          , MatCardHeader
          , MatDivider
          , MatCardContent
          , MatIcon
          , MatLabel
          , MatFormField
          , MatHint
          , MatError
          , MatCardActions
          , MatButtonModule
          , MatCardModule
          , MatInputModule
          , FormsModule
          , MatTooltipModule,MatIconButton,MatIconModule,ReactiveFormsModule],
  templateUrl: './aprobar-cotizacion.component.html',
  styleUrl: './aprobar-cotizacion.component.css'
})
export class AprobarCotizacionComponent {
  constructor(
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<AprobarCotizacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AprobarCotizacionData
    ) { }




  infoGral = input.required<ISolicitud | undefined>();
  infoSolicitud = computed(()=> this.infoGral());

     storage = inject(StorageService);
    _storage = signal(this.storage.get<ISesionInterface>('sesion'));
    notificacioAlertnService = inject(NotificacioAlertnService);

    idUsuario = this._storage()?.usuarioLogin.usuario!;
    apruebaCotService = inject(AprobarCotizacionService);
    apruebaCotRequest!: IApruebaCotRequest;
    motivo = new FormControl();
   compania = new FormControl<number | null>(null, Validators.required);
   detalleControl = new FormControl('', [
    Validators.maxLength(500),
    Validators.required,
  ]);


    aprobarCotizacion = signal<FormGroup>(
    new FormGroup({
      compania: this.compania,
    })
  );

  cancelar(): void {
    this.dialogRef.close('cancelado');
  }

  aprobar(): void {

    this.apruebaCotRequest = {
      p_id_solicitud: this.data.solicitudId,
      p_id_compania_seguro:this.data.idCia,
      p_id_usuario: this.idUsuario,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
    };
    console.log('boton aprobar',this.apruebaCotRequest.p_id_compania_seguro)
    this.apruebaCotService
      .postApruebaCotizacion(this.apruebaCotRequest)
      .subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.confirmar();
          }
        },
        error: (error) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }

async confirmar(){
    const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
              "La solicitud ha sido devuelta exitosamente.");
    if (result) {
      this.dialogRef.close(true);
    }
  }

  getErrorMessage() {
    return this.motivo.hasError('required')
    ? 'Debe ingresar el motivo de devolución.' : '';
  }
}
