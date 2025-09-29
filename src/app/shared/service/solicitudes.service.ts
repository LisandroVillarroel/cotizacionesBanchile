import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IAseguradoLista, IBeneficiarioLista } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  /*
 private _http = inject(HttpClient);
  private datoAsegurados = signal<ISolicitudAsegurado[]>([
        {
          rutAsegurado: '12514508-6',
          nombreAsegurado: 'Nombre Asegurado 1',
          apellidoPaternoAsegurado: 'apellido Paterno 1',
          apellidoMaternoAsegurado: 'apellido Materno 1',
          regionAsegurado: 'Metropolitana 1',
          ciudadAsegurado: 'Santiago 1',
          comunaAsegurado: 'maipú 1',
          direccionAsegurado: 'dirección  1',
          telefonoAsegurado: '11111111',
          correoAsegurado: 'correo1@gmail.com',
        },
        {
          rutAsegurado: '14245328-2',
          nombreAsegurado: 'Nombre Asegurado 2',
          apellidoPaternoAsegurado: 'apellido Paterno 2',
          apellidoMaternoAsegurado: 'apellido Materno 2',
          regionAsegurado: 'Metropolitana 2',
          ciudadAsegurado: 'Santiago 2',
          comunaAsegurado: 'maipú 2',
          direccionAsegurado: 'dirección  2',
          telefonoAsegurado: '2222222222',
          correoAsegurado: 'correo2@gmail.com',
        },
      ]);

  private datoBeneficiarios = signal<ISolicitudBeneficiario[]>([
        {
          rutBeneficiario: '12514508-6',
          nombreBeneficiario: 'Nombre Beneficiario 1',
          apellidoPaternoBeneficiario: 'apellido Paterno 1',
          apellidoMaternoBeneficiario: 'apellido Materno 1',
          regionBeneficiario: 'Metropolitana 1',
          ciudadBeneficiario: 'Santiago 1',
          comunaBeneficiario: 'maipú 1',
          direccionBeneficiario: 'dirección  1',
          telefonoBeneficiario: '11111111',
          correoBeneficiario: 'correo1@gmail.com',
        },
        {
          rutBeneficiario: '14245328-2',
          nombreBeneficiario: 'Nombre Beneficiario 2',
          apellidoPaternoBeneficiario: 'apellido Paterno 2',
          apellidoMaternoBeneficiario: 'apellido Materno 2',
          regionBeneficiario: 'Metropolitana 2',
          ciudadBeneficiario: 'Santiago 2',
          comunaBeneficiario: 'maipú 2',
          direccionBeneficiario: 'dirección  2',
          telefonoBeneficiario: '2222222222',
          correoBeneficiario: 'correo2@gmail.com',
        },
      ]);

   getSolicitudId(id: string): ISolicitudAsegurado[] | undefined {
    return this.datoAsegurados();
  }

  getBeneficiarioId(id: string): ISolicitudBeneficiario[] | undefined {
    return this.datoBeneficiarios();
  }
    */
}
