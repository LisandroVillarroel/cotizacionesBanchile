import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IEstadoIngresoSolicitud,
  IIngresoSolicitud,
} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class IngresoSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postIngresoSolicitud(ingresoSolicitud: IIngresoSolicitud): Observable<any> {
    console.log('Ingreso Solicitud Service:', ingresoSolicitud);
    return this.http
      .post<any>(`${environment.apiUrl}/ingresoSolicitud`, ingresoSolicitud, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('paso error tipo seguro: ', error);
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
