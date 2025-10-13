import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IDevuelveRequest } from './devolver-interface';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class DevolverSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postDevuelveSolicitud(devuelveSolicitud: IDevuelveRequest): Observable<IResponse> {
    //console.log('Devuelve Solicitud Service:', devuelveSolicitud);
    return this.http.post<IResponse>(
        `${environment.apiUrl}/devolverSolicitud`,
        devuelveSolicitud, { headers: this.headers, }
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    //console.log('Error Devolviendo Solicitud:', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log('Error: ', errorMessage);
    return throwError(errorMessage);
  }
}
