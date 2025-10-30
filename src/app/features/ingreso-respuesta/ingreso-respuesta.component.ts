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

  infoPrincipalComponent!: InformacionPrincipalComponent;
  constructor(
    private registrarRespuestaService: RegistrarRespuestaService
  ) {}

  @ViewChild(InformacionPrincipalComponent)

  panelOpenState = false;
  detalleService = inject(DetalleSolicitudService);
  observaciones = signal<IObservacion[] | undefined>(undefined);

  public readonly idSolicitud = this.datos.infoGral.id_solicitud;
  idSol = computed(() => this.idSolicitud);

  fechaActual = new FormControl<Date>(new Date());
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  async ngOnInit() {

  }


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
    p_id_moneda: this.infoPrincipalComponent.moneda.value,
    p_valor_prima_neta: this.infoPrincipalComponent.primaNeta.value,
    p_valor_prima_afecta: this.infoPrincipalComponent.primaAfecta.value,
    p_valor_prima_bruta: this.infoPrincipalComponent.primaBruta.value,
    p_id_medio_de_pago: this.infoPrincipalComponent.mPago.value,
    p_id_banco: this.infoPrincipalComponent.banco.value,
    p_id_tipo_cuenta: this.infoPrincipalComponent.tipoCuenta.value,
    p_nro_cuenta: this.infoPrincipalComponent.nroCuenta.value,
    p_cantidad_cuotas: this.infoPrincipalComponent.nroCuotas.value,
    p_fecha_inicio_vigencia: this.formatFecha(this.infoPrincipalComponent.fechaInicio),
    p_fecha_termino_vigencia: this.formatFecha(this.infoPrincipalComponent.fechaTermino),
    p_dia_vencimiento_primera_cuota: this.formatFecha(this.infoPrincipalComponent.fechaVencimiento),
    p_id_cotizacion_compania: this.infoPrincipalComponent.nombreArchivoCompania,
    p_ruta_cotizacion_compania: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_CIAS",//
    p_id_cotizacion_propuesta: this.infoPrincipalComponent.nombreArchivoPropuesta,
    p_ruta_cotizacion_propuesta: "C:\\DOCUMENTOS\\COTIZACIONES\\ASEGURADORAS\\COTI_PPTAS",//

    //archivoCompania: this.infoPrincipalComponent.selectedCompaniaFile,
    //archivoPropuesta: this.infoPrincipalComponent.selectedPropuestaFile,

    p_id_usuario: this._storage()?.usuarioLogin.usuario!,
    p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!
  };
  this.registrarRespuestaService.registrarRespuesta(datos).subscribe({
    next: (res) => {
    },
    error: (err) => {

    }
  });
}


formatFecha(fecha: Date | null): string {
  if (!fecha) return '';
  const iso = new Date(fecha).toISOString();
  return iso.split('T')[0]; // Devuelve formato YYYY-MM-DD
}

}

