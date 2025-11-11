import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IUsuario } from './usuario-Interface';


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
  postAgregaUsuario(agregaUsuario: IUsuario): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/ingresarUsuario`, agregaUsuario, {
        headers: this.headers,
      })
  }

  postModificaUsuario(modificaUsuario: IUsuario): Observable<any> {
    return this.http
      .post<any>(
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
  ): Observable<any> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_usuario: rutUsuario,
    };
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/eliminarUsuario`, parametro, {
        headers: this.headers,
      })
  }

  postListadoUsuario(filtro: any): Observable<IUsuario[]> {
    return this.http
      .post<IUsuario[]>(
        `${environment.apiUrlConsumer}/listarUsuarios`,
        filtro,
        { headers: this.headers }
      )
  }

}
