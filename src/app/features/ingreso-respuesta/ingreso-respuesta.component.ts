import { Component, computed, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { ResumenGeneralComponent } from "@features/dashboard/resumen-general/resumen-general.component";
import { SolicitudesGestionadasComponent } from "@features/dashboard/solicitudes-gestionadas/solicitudes-gestionadas.component";
import DistribucionComponent from "@features/dashboard/distribucion/distribucion.component";
import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import { DetalleSolicitudInterface, IObservacion, ISolicitud } from '@features/detalle-solicitud/detalle-interface';
import { MAT_DIALOG_DATA, MatDialogContent } from "@angular/material/dialog";
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
import { DetalleSolicitudService } from '@features/detalle-solicitud/detalle-solicitud.service';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { AseguradoComponent } from "@features/ingreso-solicitud/asegurado/asegurado.component";
import { BeneficiarioComponent } from "@features/ingreso-solicitud/beneficiario/beneficiario.component";

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
    MatDialogClose, InformacionPrincipalComponent, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatCard, MatCardContent, MatDivider, AseguradoComponent, BeneficiarioComponent],
  templateUrl: './ingreso-respuesta.component.html',
  styleUrl: './ingreso-respuesta.component.css'
})
export class IngresoRespuestaComponent {
  panelOpenState = false;
  infoGral = signal<ISolicitud | undefined>(undefined);
  detalleService = inject(DetalleSolicitudService);
  observaciones = signal<IObservacion[] | undefined>(undefined);


  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);

  idSol = computed(() => this.idSolicitud.toString() );

fechaActual = new FormControl<Date>(new Date());
storage = inject(StorageService);
_storage = signal(this.storage.get<ISesionInterface>('sesion'));
dashboardService = inject(DashboardService)
resumenGeneral = signal<IResumenSolicitudes>({p_EnProceso: 0,
  p_EsperandoRespuesta: 0,
  p_Aprobadas: 0,
  p_ConObservaciones: 0});
  listadoSolicitudes = signal<IListadoSolicitudes[] >([]);


 cargarSolicitud(idSolicitud: number){
     this.detalleService.postDetalle(idSolicitud).subscribe({
      next: (dato: DetalleSolicitudInterface) => {
        if (dato.codigo === 200) {
          //console.log('Detalle solicitud:', dato);
          this.infoGral.set({
            id_solicitud : this.idSolicitud,
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
          //this.asegurados.set(dato.c_asegurados);
          //this.beneficiarios.set(dato.c_beneficiarios);
          this.observaciones.set(dato.c_observaciones);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:', dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
        console.log('ID Solicitud:', idSolicitud);
      },
    });
  }

async ngOnInit(){
    this.cargarSolicitud(this.idSolicitud);
  }




}
