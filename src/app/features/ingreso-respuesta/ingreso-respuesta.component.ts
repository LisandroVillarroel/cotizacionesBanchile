import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { ResumenGeneralComponent } from "@features/dashboard/resumen-general/resumen-general.component";
import { SolicitudesGestionadasComponent } from "@features/dashboard/solicitudes-gestionadas/solicitudes-gestionadas.component";
import DistribucionComponent from "@features/dashboard/distribucion/distribucion.component";
import { InformacionGeneralComponent } from "@features/detalle-solicitud/informacion-general/informacion-general.component";
import { ISolicitud } from '@features/detalle-solicitud/detalle-interface';
import { MAT_DIALOG_DATA, MatDialogContent } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { InformacionPrincipalComponent } from "./informacion-principal/informacion-principal.component";

@Component({
  selector: 'app-ingreso-respuesta',
  standalone: true,
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
    MatDialogClose, InformacionPrincipalComponent],
  templateUrl: './ingreso-respuesta.component.html',
  styleUrl: './ingreso-respuesta.component.css'
})
export class IngresoRespuestaComponent {
  public readonly idSolicitud = inject<number>(MAT_DIALOG_DATA);
infoGral = signal<ISolicitud | undefined>(undefined);







}
