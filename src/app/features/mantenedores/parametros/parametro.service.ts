import { InterfazParametro, IParametro, IParametroUpdate } from './parametro-Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRequestSm, IResponse } from '@shared/modelo/servicios-interface';
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

  postAgregaParametro(agregaParametro: IParametro): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${environment.apiUrlConsumer}/crearParametro`, agregaParametro, {
        headers: this.headers,
      })
  }
  postModificaParametro(modificaParametro: IParametroUpdate): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${environment.apiUrlConsumer}/modificarParametro`, modificaParametro, {
        headers: this.headers,
      })
  }

   postParametros(postParametros: IRequestSm): Observable<InterfazParametro> {
    return this.http
      .post<InterfazParametro>(`${environment.apiUrlConsumer}/listarParametros`, postParametros, {
        headers: this.headers,
      })
  }
}
