import { InterfazRubro, IRubro, IRubroLista, IRubroUpdate } from './rubros-interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRequestGestion } from '@shared/modelo/servicios-interface';

import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor() { }

  postAgregaRubro(agregaRubro: IRubro): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/crearRubro`, agregaRubro, {
        headers: this.headers,
      })
  }
  postModificaRubro(modificaRubro: IRubroUpdate): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/modificarRubro`, modificaRubro, {
        headers: this.headers,
      })
  }

   postRubros(postRubros: IRequestGestion): Observable<InterfazRubro> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/listarRubrosMan`, postRubros, {
        headers: this.headers,
      })
  }
}
