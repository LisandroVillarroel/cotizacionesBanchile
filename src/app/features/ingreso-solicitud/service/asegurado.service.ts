import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  IAsegurado,
  DatosAseguradosInterface,
  IDatosPersona,
} from '../modelo/ingresoSolicitud-Interface';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaAsegurado(agregaAsegurado: IAsegurado): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/ingresarAsegurado`,
      agregaAsegurado,
      {
        headers: this.headers,
      }
    );
  }

  postModificaAsegurado(modificaAsegurado: IAsegurado): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/modificarAsegurado`,
      modificaAsegurado,
      {
        headers: this.headers,
      }
    );
  }

  postEliminaAsegurado(
    isolicitud: number,
    rutAsegurado: string
  ): Observable<IResponse> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_asegurado: rutAsegurado,
    };
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/eliminarAsegurado`,
      parametro,
      {
        headers: this.headers,
      }
    );
  }

  postListadoAsegurado(idSolicitud: number): Observable<DatosAseguradosInterface> {
    const filtro = { p_id_solicitud: idSolicitud };
    return this.http.post<DatosAseguradosInterface>(
      `${environment.apiUrlConsumer}/listarAsegurados`,
      filtro,
      { headers: this.headers }
    );
  }

  //Servicio para traer datos del mock a asegurado
  getDatosAsegurado(rut: string): Observable<IDatosPersona> {
    return this.http.get<IDatosPersona>(
      `http://192.168.1.36:8082/ms-pseg-cotizaciones/cotizaciones/clientesQms_pruebalocal/${rut}`,
      { headers: this.headers }
    );
/*     return this.http.get(
      `http://192.168.1.36:8082/ms-pseg-cotizaciones/cotizaciones/clientesQms_pruebalocal/${rut}`
    ); */
  }
}
