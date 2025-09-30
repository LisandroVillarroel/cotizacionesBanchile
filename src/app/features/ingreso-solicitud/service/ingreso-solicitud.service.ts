import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IIngresoSolicitud,
  IIngresoSolicitud_Recibe,
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

  postIngresoSolicitud(
    ingresoSolicitud: IIngresoSolicitud
  ): Observable<IIngresoSolicitud_Recibe> {
    console.log('Ingreso Solicitud Service:', ingresoSolicitud);
    return this.http
      .post<IIngresoSolicitud_Recibe>(
        `${environment.apiUrl}/ingresoSolicitud`,
        ingresoSolicitud,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('Paso Error Solicitud:', error);
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
