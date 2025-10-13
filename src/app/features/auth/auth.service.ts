import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthRespuesta } from './auth-Interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

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
      const parametro={
    p_id_usuario: usuario
}
       console.log('Ingreso Solicitud Service:', usuario);
       return this.http
         .post<IAuthRespuesta>(`http://192.168.1.36:8080/ms-pseg-cotizaciones-login/cotizaciones/loginUsuario`, parametro, {
           headers: this.headers,
         })
     }


}
