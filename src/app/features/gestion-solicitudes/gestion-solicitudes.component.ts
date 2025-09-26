import { Component, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from "@angular/material/tooltip";
import { NuevasComponent } from './nuevas/nuevas.component';
import { ConObservacionesComponent } from './con-observaciones/con-observaciones.component';
import { ISolicitudG } from './gestionSolicitud-interface';

@Component({
  selector: 'app-gestion-solicitudes',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    CommonModule,
    NuevasComponent, //ConObservacionesComponent
  ],
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.css'
})
export default class GestionSolicitudesComponent {
  fechaActual: Date = new Date();
  //datosSolicitud = signal<ISolicitudG[] | undefined>(undefined);

  datosSolicitud = signal<ISolicitudG[]>([
      {
        Sla: 1,
        ID: "COT-1243123",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 1",
        IdRubro: "1",
        Rubro: 'AUTOMOTRIZ',
        IdTipoSeguro: "1",
        TipoSeguro: "VEHICULO LIVIANO",
        Fecha: '15/03/2023',
        //Observaciones:[],
        //Companias:[]
      },
      {
        Sla: 1,
        ID: "COT-1243125",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 2",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "1",
        TipoSeguro: "RESPONSABILIDAD CIVIL MEDICA",
        Fecha: '22/07/2023',
        //Observaciones:[],
        //Companias:[]

     },
      {
        Sla: 2,
        ID: "COT-1245723",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 3",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "2",
        TipoSeguro: "VIDA",
        Fecha: '30/09/2023',
        //Observaciones:[],
        //Companias:[]

  },
      {
        Sla: 2,
        ID: "COT-1257213",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 4",
        IdRubro: "1",
        Rubro: 'AUTOMOTRIZ',
        IdTipoSeguro: "2",
        TipoSeguro: "VEHICULO PESADO",
        Fecha: '05/12/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257216",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 5",
        IdRubro: "2",
        Rubro: 'HOGAR',
        IdTipoSeguro: "1",
        TipoSeguro: "INCENDIO",
        Fecha: '18/02/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257226",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 6",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "3",
        TipoSeguro: "SALUD COLECTIVO",
        Fecha: '27/04/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257227",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 7",
        IdRubro: "2",
        Rubro: 'HOGAR',
        IdTipoSeguro: "1",
        TipoSeguro: "INCENDIO",
        Fecha: '11/06/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 1,
        ID: "COT-1243123",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 1",
        IdRubro: "1",
        Rubro: 'AUTOMOTRIZ',
        IdTipoSeguro: "1",
        TipoSeguro: "VEHICULO LIVIANO",
        Fecha: '15/03/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 1,
        ID: "COT-1243125",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 2",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "1",
        TipoSeguro: "RESPONSABILIDAD CIVIL MEDICA",
        Fecha: '22/07/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 2,
        ID: "COT-1245723",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 3",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "2",
        TipoSeguro: "VIDA",
        Fecha: '30/09/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 2,
        ID: "COT-1257213",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 4",
        IdRubro: "1",
        Rubro: 'AUTOMOTRIZ',
        IdTipoSeguro: "3",
        TipoSeguro: "TRANSPORTE TERRESTRE",
        Fecha: '05/12/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257216",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 5",
        IdRubro: "4",
        Rubro: 'AGRICOLA',
        IdTipoSeguro: "1",
        TipoSeguro: "AGRICOLA",
        Fecha: '18/02/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257226",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 6",
        IdRubro: "3",
        Rubro: 'VIDA',
        IdTipoSeguro: "3",
        TipoSeguro: "SALUD COLECTIVO",
        Fecha: '27/04/2023',
        //Observaciones:[],
        //Companias:[]

      },
      {
        Sla: 3,
        ID: "COT-1257227",
        Rut: "00.000.000-1",
        Contratante: "Nombre Comercial S.A. 7",
        IdRubro: "2",
        Rubro: 'HOGAR',
        IdTipoSeguro: "1",
        TipoSeguro: "INCENDIO",
        Fecha: '11/06/2023',
        //Observaciones:[],
        //Companias:[]

      },
    ]);

}
