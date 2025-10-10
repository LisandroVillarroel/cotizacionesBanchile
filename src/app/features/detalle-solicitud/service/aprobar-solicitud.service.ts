import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IApruebaRequest,
  IApruebaResponse
} from '@features/detalle-solicitud/modelo/aprobar-interface';

@Injectable({
  providedIn: 'root'
})
export class AprobarSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postApruebaSolicitud(apruebaSolicitud: IApruebaRequest): Observable<IApruebaResponse> {
    //console.log('Anula Solicitud Service:', apruebaSolicitud);
    return this.http.post<IApruebaResponse>(
        `${environment.apiUrl}/aprobarSolicitud`,
        apruebaSolicitud, { headers: this.headers, }
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    //console.log('Error Aprobando Solicitud:', error);
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
