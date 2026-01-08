import { InterfazParametro, IParametro, IParametroUpdate } from './parametro-Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRequestGestion } from '@shared/modelo/servicios-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor() { }

  postAgregaParametro(agregaParametro: IParametro): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/crearParametro`, agregaParametro, {
        headers: this.headers,
      })
  }
  postModificaParametro(modificaParametro: IParametroUpdate): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/modificarParametro`, modificaParametro, {
        headers: this.headers,
      })
  }

   postParametros(postParametros: IRequestGestion): Observable<InterfazParametro> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/listarParametros`, postParametros, {
        headers: this.headers,
      })
  }
}
