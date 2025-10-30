import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogContent } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatDialogClose } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DashboardService } from '@features/dashboard/dashboard.service';
import { IListadoSolicitudes, IResumenSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { MatCard, MatCardHeader, MatCardActions } from "@angular/material/card";
import { MatTooltip } from "@angular/material/tooltip";
import { MatButton } from '@angular/material/button';

import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { DetalleSolicitudInterface, IObservacion, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { IRegistrarRespuesta } from '@shared/modelo/registrar-respuesta-interface';

import { StorageService } from '@shared/service/storage.service';
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';
import { RegistrarRespuestaService } from '@shared/service/registrar-respuesta.service';

import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import ModalAseguradoComponent from './modal-asegurado/modal-asegurado.component';
import { ModalBeneficiarioComponent } from './modal-beneficiario/modal-beneficiario.component';
import CabeceraPopupComponente from "../../shared/ui/cabeceraPopup.component";
import InformacionPrincipalComponent from "./informacion-principal/informacion-principal.component";
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

export interface IRespuesta {
  /* solicitudId: number,
  rutContratante: string,
  nomContratante: string,
  rubro: string,
  tipoSeguro: string, */
  infoGral: ISolicitud,
  idCompania: number
};

@Component({
  selector: 'app-ingreso-respuesta',
  standalone: true,
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS),],
  imports: [
    InformacionGeneralComponent,
    MatDialogContent,
    MatIcon,
    MatDialogClose,
    InformacionPrincipalComponent,
    MatCard,
    MatCardHeader,
    MatTooltip,
    MatCardActions,
    MatButton, CabeceraPopupComponente],
  templateUrl: './ingreso-respuesta.component.html',
  styleUrl: './ingreso-respuesta.component.css'
})

export class IngresoRespuestaComponent {
  public readonly datos = inject<IRespuesta>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public readonly idSolicitud = this.datos.infoGral.id_solicitud;

  infoPrincipalComponent!: InformacionPrincipalComponent;
  constructor(
    private registrarRespuestaService: RegistrarRespuestaService
  ) {}

  @ViewChild(InformacionPrincipalComponent)
  panelOpenState = false;

  fechaActual = new FormControl<Date>(new Date());
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);

  async ngOnInit() {}

  verDetalleAse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.datos.infoGral.id_solicitud;
    this.dialog
      .open(ModalAseguradoComponent, dialogConfig)
      .afterClosed()
  }

  verDetalleBen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = this.datos.infoGral.id_solicitud;
    this.dialog
      .open(ModalBeneficiarioComponent, dialogConfig)
      .afterClosed()
  }

 registraRespuesta() {
  const datos: IRegistrarRespuesta = {
    p_id_solicitud: this.datos.infoGral.id_solicitud,
    p_id_compania_seguro: this.datos.idCompania,//
    p_id_moneda: this.infoPrincipalComponent.formRespuesta().value.modeda,
    p_valor_prima_neta: this.infoPrincipalComponent.formRespuesta().value.primaNeta,
    p_valor_prima_afecta: this.infoPrincipalComponent.formRespuesta().value.primaAfecta,
    p_valor_prima_bruta: this.infoPrincipalComponent.formRespuesta().value.primaBruta,
    p_id_medio_de_pago: this.infoPrincipalComponent.formRespuesta().value.mPago,
    p_id_banco: this.infoPrincipalComponent.formRespuesta().value.banco,
    p_id_tipo_cuenta: this.infoPrincipalComponent.formRespuesta().value.tipoCuenta,
    p_nro_cuenta: this.infoPrincipalComponent.formRespuesta().value.nroCuenta,
    p_cantidad_cuotas: this.infoPrincipalComponent.formRespuesta().value.nroCuotas.value!,
    p_fecha_inicio_vigencia: this.formatFecha(this.infoPrincipalComponent.formRespuesta().value.fechaInicio),
    p_fecha_termino_vigencia: this.formatFecha(this.infoPrincipalComponent.formRespuesta().value.fechaTermino),
    p_dia_vencimiento_primera_cuota: this.formatFecha(this.infoPrincipalComponent.formRespuesta().value.fechaVencimiento),
    p_id_cotizacion_compania: this.infoPrincipalComponent.formRespuesta().value.nombreArchivoCompania,
    p_ruta_cotizacion_compania: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_CIAS",//
    p_id_cotizacion_propuesta: this.infoPrincipalComponent.formRespuesta().value.nombreArchivoPropuesta,
    p_ruta_cotizacion_propuesta: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_PPTAS",//

    //archivoCompania: this.infoPrincipalComponent.selectedCompaniaFile,
    //archivoPropuesta: this.infoPrincipalComponent.selectedPropuestaFile,

    p_id_usuario: this._storage()?.usuarioLogin.usuario!,
    p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!
  };
  this.registrarRespuestaService.registrarRespuesta(datos).subscribe({
    next: async (res) => {
      if (res.codigo === 200) {
        const result = await this.notificacioAlertnService.confirmacion("CONFIRMACIÓN",
          "La respuesta se ha registrado exitosamente.");
      }
    },
    error: (error) => {
      this.notificacioAlertnService.error('ERROR','Error Inesperado');
    },
  });
}

formatFecha(fecha: Date | null): string {
  if (!fecha) return '';
  const iso = new Date(fecha).toISOString();
  return iso.split('T')[0]; // Devuelve formato YYYY-MM-DD
}

}
