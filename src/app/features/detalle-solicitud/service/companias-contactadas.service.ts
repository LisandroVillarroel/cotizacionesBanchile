import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  ICompaniaResponse,
  ICompaniasResponse,
} from '../modelo/detalle-interface';
import {
  IAgregaCompania,
  IModificaCompania,
  IEliminaCompania,
  IMinimoResponse,
} from '@features/detalle-solicitud/modelo/compania';
import { IRequest, IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniasContactadasService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postCompanias(IdSolicitud: number): Observable<ICompaniaResponse> {
    const parametro = { p_id_solicitud: IdSolicitud };
    return this.http.post<ICompaniaResponse>(
      `${environment.apiUrlConsumer}/listarCompaniasContactadas`,
      parametro,
      { headers: this.headers }
    );
  }

  postCompaniasTipoSeguro(idRubro: number, idTipoSeguro: number): Observable<ICompaniasResponse> {
    const filtro = {
      p_rubro: idRubro,
      p_tipo_seguro:idTipoSeguro,
    };
    return this.http.post<ICompaniasResponse>(
      `${environment.apiUrlConsumer}/listarCompaniasTipoSeguro`,
      filtro,
      { headers: this.headers }
    );
  }

  postAgregaCompania(
    agregarCompaniasSolicitud: IAgregaCompania
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/agregarCompaniasSolicitud`,
      agregarCompaniasSolicitud,
      {
        headers: this.headers,
      }
    );
  }

  postModificaCompania(
    modificarCompaniasSolicitud: IModificaCompania
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/modificarCompaniasSolicitud`,
      modificarCompaniasSolicitud,
      {
        headers: this.headers,
      }
    );
  }

  postEliminaCompania(
    eliminarCompaniasSolicitud: IEliminaCompania
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/eliminarCompaniasSolicitud`,
      eliminarCompaniasSolicitud,
      {
        headers: this.headers,
      }
    );
  }

  postMinimo(IdSolicitud: number): Observable<IMinimoResponse> {
    const parametro = { p_id_solicitud: IdSolicitud };
    return this.http.post<IMinimoResponse>(
      `${environment.apiUrlConsumer}/obtenerMinimoCotizaciones`,
      parametro,
      { headers: this.headers }
    );
  }

  postEnviaSolicitud(enviaSolicitud: IRequest): Observable<IResponse> {
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/enviarSolicitudCompanias`,
        enviaSolicitud, { headers: this.headers, }
      )
  }
}
