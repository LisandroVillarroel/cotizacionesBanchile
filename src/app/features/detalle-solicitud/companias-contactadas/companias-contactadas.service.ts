import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ICompaniaResponse } from '../modelo/detalle-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniasContactadasService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor() { }

  postCompanias(IdSolicitud: number): Observable<ICompaniaResponse> {
    const parametro = {p_id_solicitud: IdSolicitud};
    return this.http
      .post<ICompaniaResponse>(`${environment.apiUrl}/listarCompaniasContactadas`, parametro,{headers: this.headers})
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    //console.log('Error en detalle de solicitud: ', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log('Error: ', errorMessage);
    return throwError(errorMessage);
  }
}
