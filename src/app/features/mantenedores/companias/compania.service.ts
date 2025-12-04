import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  DatosCompaniaSeguro,
  DatosCompaniaSeguroModificar,
  ICompaniaSeguroModificar,
  DatosTipoSeguroCompania,
  DatosContactoCompania,
} from './compania-Interface';
import { InterfazRubro } from '@shared/modelo/rubro-interface';
import { InterfazTipoSeguro } from '@shared/modelo/tipoSeguro-interface';

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

  postListadoCompania(filtro: any): Observable<DatosCompaniaSeguro> {
    return this.http.post<DatosCompaniaSeguro>(
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

  postAgregaContacto(payload: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrlConsumer}/crearContactoCompania`,
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

  postAgregaTipoSeguro(payload: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrlConsumer}/crearTipoSeguroCompania`,
      payload,
      { headers: this.headers }
    );
  }

  postRubro(): Observable<InterfazRubro> {
    return this.http.get<InterfazRubro>(
      `${environment.apiUrlConsumer}/listarRubros`,
      { headers: this.headers }
    );
  }

  postTipoSeguro(payload: any): Observable<InterfazTipoSeguro> {
    return this.http.post<InterfazTipoSeguro>(
      `${environment.apiUrlConsumer}/listarProductos`,
      payload,
      { headers: this.headers }
    );
  }
}
