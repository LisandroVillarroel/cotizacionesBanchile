import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DatosUsuarioLista, IUsuario, IUsuarioListaPerfiles } from './usuario-Interface';
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
    return this.http.post<IResponse>(`${environment.apiUrlConsumer}/crearUsuario`, agregaUsuario, {
      headers: this.headers,
    });
  }

  postModificaUsuario(modificaUsuario: IUsuario): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/modificarUsuario`,
      modificaUsuario,
      {
        headers: this.headers,
      },
    );
  }

  postEliminaUsuario(isolicitud: number, rutUsuario: string): Observable<IResponse> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_usuario: rutUsuario,
    };
    return this.http.post<IResponse>(`${environment.apiUrlConsumer}/eliminarUsuario`, parametro, {
      headers: this.headers,
    });
  }

  postListadoUsuario(
    p_id_usuario: string,
    p_tipo_usuario: string,
    tipoConsulta: string,
  ): Observable<DatosUsuarioLista> {
    const estructura_lista = {
      p_id_usuario: p_id_usuario, //"sup002",
      p_tipo_usuario: p_tipo_usuario, //"S",
      p_tipo_consulta: tipoConsulta, //"E"
    };
    console.log('parametro listado usuarios:', estructura_lista);
    return this.http.post<DatosUsuarioLista>(
      `${environment.apiUrlConsumer}/listarUsuarios`,
      estructura_lista,
      { headers: this.headers },
    );
  }

  postListaPerfiles(
    p_id_usuario: string,
    p_tipo_usuario: string,
  ): Observable<IUsuarioListaPerfiles> {
    const parametro = {
      p_id_usuario: p_id_usuario,
      p_tipo_usuario: p_tipo_usuario,
    };
    console.log('parametro perfiles:', parametro);
    return this.http.post<IUsuarioListaPerfiles>(
      `${environment.apiUrlConsumer}/listarPerfiles`,
      parametro,
      { headers: this.headers },
    );
  }
}
