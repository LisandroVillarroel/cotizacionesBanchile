import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { InformacionGeneralComponent } from "./informacion-general/informacion-general.component";
import { DocumentosAsociadosComponent } from "./documentosasociados/documentosasociados.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [MatFormField, InformacionGeneralComponent, DocumentosAsociadosComponent, MatButtonModule],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css',
  encapsulation:ViewEncapsulation.None
})
export default class DetalleSolicitudComponent {

}
