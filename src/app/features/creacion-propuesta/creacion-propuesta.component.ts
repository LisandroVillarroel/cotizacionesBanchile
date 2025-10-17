import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { DetalleSolicitudInterface, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import { MatDialogClose } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';
import { AseguradoComponent } from "@features/ingreso-solicitud/asegurado/asegurado.component";
import { MateriaAseguradaComponent } from "@features/ingreso-solicitud/materia-asegurada/materia-asegurada.component";
import { MatCardActions } from "@angular/material/card";
import { MatButton } from '@angular/material/button';
import { DocAsociadosComponent } from "./doc-asociados/doc-asociados.component";

@Component({
  selector: 'app-creacion-propuesta',
  standalone: true,
  imports: [MatDialogContent,
    MatIcon,
    InformacionGeneralComponent,
    MatDialogClose,
    MatIconButton,
    AseguradoComponent,
    MateriaAseguradaComponent,
    MatCardActions,
    MatButton, DocAsociadosComponent],
  templateUrl: './creacion-propuesta.component.html',
  styleUrl: './creacion-propuesta.component.css'
})
export class CreacionPropuestaComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);

    idSol = computed(() => this.idSolicitud.toString());
  infoGral = signal<ISolicitud | undefined>(undefined);

  detalleService = inject(DetalleSolicitudService);

    cargarSolicitud(idSolicitud: number) {
      this.detalleService.postDetalle(idSolicitud).subscribe({
        next: (dato: DetalleSolicitudInterface) => {
          if (dato.codigo === 200) {
            //console.log('Detalle solicitud:', dato);
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
            //this.asegurados.set(dato.c_asegurados);
            //this.beneficiarios.set(dato.c_beneficiarios);
            //this.observaciones.set(dato.c_observaciones);
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

}
