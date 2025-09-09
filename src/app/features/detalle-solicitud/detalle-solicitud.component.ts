import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { InformacionGeneralComponent } from "./informacion-general/informacion-general.component";
import { DocumentosAsociadosComponent } from "./documentosasociados/documentosasociados.component";
import { CompaniasContactadasComponent } from "./companias-contactadas/companias-contactadas.component";

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [MatFormField, InformacionGeneralComponent, DocumentosAsociadosComponent, CompaniasContactadasComponent],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css'
})
export default class DetalleSolicitudComponent {

}
