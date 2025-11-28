import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogContent } from "@angular/material/dialog";
import { DetalleSolicitudInterface, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import { MatDialogClose } from '@angular/material/dialog';
import { DetalleSolicitudService } from '@features/detalle-solicitud/service/detalle-solicitud.service';
import { AseguradoComponent } from "@features/ingreso-solicitud/asegurado/asegurado.component";
import { MateriaAseguradaComponent } from "@features/ingreso-solicitud/materia-asegurada/materia-asegurada.component";
import { MatCardActions } from "@angular/material/card";
import { MatButton } from '@angular/material/button';
import { DocAsociadosComponent } from "./doc-asociados/doc-asociados.component";
import { ConfirmacionPptaComponent } from './confirmacion-ppta/confirmacion-ppta.component';
import CabeceraPopupComponente from "../../shared/ui/cabeceraPopup.component";
import { BeneficiarioComponent } from "@features/ingreso-solicitud/beneficiario/beneficiario.component";
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { GenerarPropuestaService } from './generar-propuesta.service';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-creacion-propuesta',
  standalone: true,
  imports: [MatDialogContent,
    InformacionGeneralComponent,
    AseguradoComponent,
    BeneficiarioComponent,
    MateriaAseguradaComponent,
    DocAsociadosComponent,
    CabeceraPopupComponente,
    MatDialogClose,
    MatCardActions,
    MatButton,
    ],
  templateUrl: './creacion-propuesta.component.html',
  styleUrl: './creacion-propuesta.component.css'
})
export class CreacionPropuestaComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);

  idSol = computed(() => this.idSolicitud.toString());
  infoGral = signal<ISolicitud | undefined>(undefined);

  detalleService = inject(DetalleSolicitudService);
  generarService = inject(GenerarPropuestaService);
  notificacioAlertnService = inject(NotificacioAlertnService);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

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
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR','No fue posible obtener  el detalle de la solicitud.');
      }
    });
  }

  async OnInit() {
    this.cargarSolicitud(this.idSolicitud);
  }

  crearPpta(): void {
    const dato = {
      p_id_solicitud: this.idSolicitud,
      p_id_usuario: this._storage()?.usuarioLogin?.usuario,
      p_tipo_usuario: this._storage()?.usuarioLogin?.tipoUsuario
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Tamaño fijo y controlado
    dialogConfig.maxHeight = '90vh'; // Altura máxima visible
    dialogConfig.panelClass = 'custom-dialog-container'; // Clase para estilos personalizados
    dialogConfig.data = dato;

    this.dialog
     .open(ConfirmacionPptaComponent, dialogConfig)
     .afterClosed()
     .subscribe(() => {
       this.cargarSolicitud(this.idSolicitud);
     });
  }
}
