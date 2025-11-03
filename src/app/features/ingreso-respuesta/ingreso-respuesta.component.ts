import { Component, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogContent } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { MatCard, MatCardHeader } from "@angular/material/card";
import { MatTooltip } from "@angular/material/tooltip";
import { MatButton } from '@angular/material/button';

import { ICompania, ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';

import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import ModalAseguradoComponent from './modal-asegurado/modal-asegurado.component';
import { ModalBeneficiarioComponent } from './modal-beneficiario/modal-beneficiario.component';
import CabeceraPopupComponente from "../../shared/ui/cabeceraPopup.component";
import InformacionPrincipalComponent from "./informacion-principal/informacion-principal.component";

export interface IRespuesta {
  infoGral: ISolicitud,
  compania: ICompania,
  flagAccion: boolean
};

@Component({
  selector: 'app-ingreso-respuesta',
  standalone: true,
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS),],
  imports: [
    InformacionGeneralComponent,
    MatDialogContent,
    MatIcon,
    InformacionPrincipalComponent,
    MatCard,
    MatCardHeader,
    MatTooltip,
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
  ) { }

  @ViewChild(InformacionPrincipalComponent)
  panelOpenState = false;

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
}
