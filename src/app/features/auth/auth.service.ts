import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthRespuesta, ITipoUsuarioRespuesta } from './auth-Interface';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  postLogin(usuario: string): Observable<IAuthRespuesta> {
    const parametro = {p_id_usuario: usuario }
      //console.log('Ingreso Solicitud Service:', usuario);
    return this.http
      .post<IAuthRespuesta>(`http://192.168.1.36:8083/ms-pseg-cotizaciones-consumer-solicitud/cotizaciones/loginUsuario`,
        parametro, { headers: this.headers })
  }

  postTipoUsuario(id_perfil: string): Observable<ITipoUsuarioRespuesta> {
    const parametro={p_id_perfil: id_perfil}
      return this.http
        .post<ITipoUsuarioRespuesta>(`${environment.apiUrlConsumer}/obtieneTipoUsuario`,
          parametro, { headers: this.headers })
  }

}
