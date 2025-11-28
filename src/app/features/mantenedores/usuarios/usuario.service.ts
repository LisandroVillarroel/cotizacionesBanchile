import {HttpClient,  HttpHeaders,} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DatosUsuarioLista, IUsuario, IUsuarioRequest } from './usuario-Interface';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaUsuario(agregaUsuario: IUsuario): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${environment.apiUrlConsumer}/crearUsuario`, agregaUsuario, {
        headers: this.headers,
      })
  }

  postModificaUsuario(modificaUsuario: IUsuario): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${environment.apiUrlConsumer}/modificarUsuario`,
        modificaUsuario,
        {
          headers: this.headers,
        }
      )
  }

  postEliminaUsuario(
    isolicitud: number,
    rutUsuario: string
  ): Observable<IResponse> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_usuario: rutUsuario,
    };
    return this.http
      .post<IResponse>(`${environment.apiUrlConsumer}/eliminarUsuario`, parametro, {
        headers: this.headers,
      })
  }

  postListadoUsuario(filtro: IUsuarioRequest): Observable<DatosUsuarioLista> {
    return this.http
      .post<DatosUsuarioLista>(`${environment.apiUrlConsumer}/listarUsuarios`, filtro, { headers: this.headers } )
  }

}
