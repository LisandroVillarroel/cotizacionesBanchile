import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  DatosCompaniaSeguroLista,
  DatosCompaniaSeguroModificar,
  ICompaniaSeguroModificar,
  DatosTipoSeguroCompania,
  DatosContactoCompania,
} from './compania-Interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniaService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postListadoCompania(filtro: any): Observable<DatosCompaniaSeguroLista> {
    return this.http.post<DatosCompaniaSeguroLista>(
      `${environment.apiUrlConsumer}/listarCompaniasSeguros`,
      filtro,
      { headers: this.headers }
    );
  }

  postAgregaCompania(payload: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrlConsumer}/crearCompaniaSeguro`,
      payload,
      { headers: this.headers }
    );
  }

  postModificarCompania(
    payload: ICompaniaSeguroModificar
  ): Observable<DatosCompaniaSeguroModificar> {
    return this.http.post<DatosCompaniaSeguroModificar>(
      `${environment.apiUrlConsumer}/modificarCompaniaSeguro`,
      payload,
      { headers: this.headers }
    );
  }

  postListadoContactos(payload: any): Observable<DatosContactoCompania> {
    return this.http.post<DatosContactoCompania>(
      `${environment.apiUrlConsumer}/listarContactosCompania`,
      payload,
      { headers: this.headers }
    );
  }

  postListadoTipoSeguroCompania(
    payload: any
  ): Observable<DatosTipoSeguroCompania> {
    return this.http.post<DatosTipoSeguroCompania>(
      `${environment.apiUrlConsumer}/listarTipoSeguroCompania`,
      payload,
      { headers: this.headers }
    );
  }
}
