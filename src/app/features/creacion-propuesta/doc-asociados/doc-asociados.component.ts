import { Component, computed, inject, signal } from '@angular/core';
import { MatCard, MatCardHeader } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { DetalleSolicitudInterface, IObservacion, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';
import { ModalBeneficiarioComponent } from '@features/ingreso-respuesta/modal-beneficiario/modal-beneficiario.component';

@Component({
  selector: 'app-doc-asociados',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatIcon],
  templateUrl: './doc-asociados.component.html',
  styleUrl: './doc-asociados.component.css'
})
export class DocAsociadosComponent {
    public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
    idSol = computed(() => this.idSolicitud.toString());
    detalleService = inject(DetalleSolicitudService);
    infoGral = signal<ISolicitud | undefined>(undefined);
    observaciones = signal<IObservacion[] | undefined>(undefined);

    private readonly dialog = inject(MatDialog);

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

  verCotiPpta(IdSolicitud: number) {

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
  }
