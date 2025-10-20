import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  ICompaniaResponse,
  ICompaniasResponse,
} from '../modelo/detalle-interface';
import { IAgregaCompania } from '@features/detalle-solicitud/modelo/compania';

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
      `${environment.apiUrl}/listarCompaniasContactadas`,
      parametro,
      { headers: this.headers }
    );
  }

  postCompaniasTipoSeguro(filtro: any): Observable<ICompaniasResponse> {
    return this.http
      .post<ICompaniasResponse>(
        `${environment.apiUrl}/listarCompaniasTipoSeguro`,
        filtro,
        { headers: this.headers }
      )
  }

  postAgregaCompania(
    agregaCompaniaSolicitud: IAgregaCompania
  ): Observable<any> {
    console.log('Agrega Compañía Service:', agregaCompaniaSolicitud);
    return this.http.post<any>(
      `${environment.apiUrl}/agregarCompaniasSolicitud`,
      agregaCompaniaSolicitud,
      {
        headers: this.headers,
      }
    );
  }
}
