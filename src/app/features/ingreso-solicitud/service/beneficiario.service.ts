import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  IBeneficiario,
  DatosBeneficiariosInterface,
  IDatosPersona,
} from '../modelo/ingresoSolicitud-Interface';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaBeneficiario(agregaBeneficiario: IBeneficiario): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/ingresarBeneficiario`,
      agregaBeneficiario,
      {
        headers: this.headers,
      }
    );
  }

  postModificaBeneficiario(
    modificaBeneficiario: IBeneficiario
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/modificarBeneficiario`,
      modificaBeneficiario,
      {
        headers: this.headers,
      }
    );
  }

  postEliminaBeneficiario(
    isolicitud: number,
    rutBeneficiario: string
  ): Observable<IResponse> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_beneficiario: rutBeneficiario,
    };

    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/eliminarBeneficiario`,
      parametro,
      {
        headers: this.headers,
      }
    );
  }

  postListadoBeneficiario(idSolicitud: number): Observable<DatosBeneficiariosInterface> {
    const filtro = { p_id_solicitud: idSolicitud };
    return this.http.post<DatosBeneficiariosInterface>(
      `${environment.apiUrlConsumer}/listarBeneficiarios`,
      filtro,
      { headers: this.headers }
    );
  }

  //Servicio para traer datos del mock a beneficiario
  getDatosBenficiario(rut: string): Observable<IDatosPersona> {
      return this.http.get<IDatosPersona>(
        `http://192.168.1.36:8082/ms-pseg-cotizaciones/cotizaciones/clientesQms_pruebalocal/${rut}`,
        { headers: this.headers }
      );
    }
}
