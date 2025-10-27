import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { ResumenGeneralComponent } from "@features/dashboard/resumen-general/resumen-general.component";
import { SolicitudesGestionadasComponent } from "@features/dashboard/solicitudes-gestionadas/solicitudes-gestionadas.component";
import DistribucionComponent from "@features/dashboard/distribucion/distribucion.component";
import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogContent } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import InformacionPrincipalComponent from "./informacion-principal/informacion-principal.component";
import { FormControl } from '@angular/forms';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';
import { DashboardService } from '@features/dashboard/dashboard.service';
import { IListadoSolicitudes, IResumenSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { MatCard, MatCardHeader, MatCardActions } from "@angular/material/card";

import { MatTooltip } from "@angular/material/tooltip";
import ModalAseguradoComponent from './modal-asegurado/modal-asegurado.component';
import { ModalBeneficiarioComponent } from './modal-beneficiario/modal-beneficiario.component';
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';
import { DetalleSolicitudInterface, IObservacion, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { MatButton } from '@angular/material/button';
import { RegistrarRespuestaService } from '@shared/service/registrar-respuesta.service';
import { HttpEventType } from '@angular/common/http';
import { IRegistrarRespuesta } from '@shared/modelo/registrar-respuesta-interface';
import CabeceraPopupComponente from "../../shared/ui/cabeceraPopup.component";

@Component({
  selector: 'app-ingreso-respuesta',
  standalone: true,
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS),],
  imports: [MatFormField,
    MatLabel,
    MatDatepickerToggle,
    ResumenGeneralComponent,
    SolicitudesGestionadasComponent,
    DistribucionComponent,
    MatDatepicker,
    InformacionGeneralComponent,
    MatDialogContent,
    MatIcon,
    MatIconButton,
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

constructor(
    private registrarRespuestaService: RegistrarRespuestaService
  ) {

  }


@ViewChild(InformacionPrincipalComponent)
infoPrincipalComponent!: InformacionPrincipalComponent;


  panelOpenState = false;
  infoGral = signal<ISolicitud | undefined>(undefined);
  detalleService = inject(DetalleSolicitudService);
  observaciones = signal<IObservacion[] | undefined>(undefined);


  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  idSol = computed(() => this.idSolicitud.toString());

  fechaActual = new FormControl<Date>(new Date());
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  dashboardService = inject(DashboardService)
  resumenGeneral = signal<IResumenSolicitudes>({
    p_EnProceso: 0,
    p_EsperandoRespuesta: 0,
    p_Aprobadas: 0,
    p_ConObservaciones: 0
  });
  listadoSolicitudes = signal<IListadoSolicitudes[]>([]);

  private readonly dialog = inject(MatDialog);

  cargarSolicitud(idSolicitud: number) {
    this.detalleService.postDetalle(idSolicitud).subscribe({
      next: (dato: DetalleSolicitudInterface) => {
        if (dato.codigo === 200) {
          this.infoGral.set({
            id_solicitud: this.idSolicitud,
            fecha_creacion_solicitud: dato.p_fecha_creacion_solicitud,
            rut_contratante: dato.p_rut_contratante,
            nombre_razon_social_contratante: dato.p_nombre_razon_social_contratante,
            id_rubro: dato.p_id_rubro,
            nombre_rubro: dato.p_nombre_rubro,
            id_tipo_seguro: dato.p_id_tipo_seguro,
            nombre_tipo_seguro: dato.p_nombre_tipo_seguro,
            sla: dato.p_sla,
            id_estado_solicitud: dato.p_id_estado_solicitud,
            nombre_estado: dato.p_nombre_estado,
            nombre_ejecutivo_banco: dato.p_nombre_ejecutivo_banco,
            id_ejecutivo_banco: dato.p_id_ejecutivo_banco
          });
          this.observaciones.set(dato.c_observaciones);
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
        console.log('ID Solicitud:', idSolicitud);
      },
    });
  }

  async ngOnInit() {
    this.cargarSolicitud(this.idSolicitud);
  }


  verDetalleAse(IdSolicitud: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
      .open(ModalAseguradoComponent, dialogConfig)
      .afterClosed()
  }

  verDetalleBen(IdSolicitud: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
      .open(ModalBeneficiarioComponent, dialogConfig)
      .afterClosed()
  }

 registraRespuesta() {
  const datos: IRegistrarRespuesta = {
    p_id_solicitud: this.infoPrincipalComponent.idSolicitud,
    p_id_compania_seguro:27,//
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
console.log(datos);
  this.registrarRespuestaService.registrarRespuesta(datos).subscribe({
    next: (res) => {
      console.log('Respuesta registrada exitosamente:', res);
    },
    error: (err) => {
      console.error('Error al registrar respuesta:', err);
    }
  });
}


formatFecha(fecha: Date | null): string {
  if (!fecha) return '';
  const iso = new Date(fecha).toISOString();
  return iso.split('T')[0]; // Devuelve formato YYYY-MM-DD
}

}

