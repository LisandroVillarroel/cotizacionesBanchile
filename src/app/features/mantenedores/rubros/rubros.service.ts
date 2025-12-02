import { InterfazRubro, IRubro, IRubroLista, IRubroUpdate } from './rubros-interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

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

  // postRubros(): Observable<InterfazRubro> {
  //   return this.http
  //     .get<InterfazRubro>(`${environment.apiUrlConsumer}/listarRubros`, { headers: this.headers })
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }

   postRubros(postRubros: IRubroLista): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/listarRubrosMan`, postRubros, {
        headers: this.headers,
      })
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('paso error rubro: ', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('Error: ', errorMessage);
    return throwError(errorMessage);
  }
}
