import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class EnviarCoordinadorService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postEnviaSolicitud(enviaSolicitud: any): Observable<IResponse> {
    //console.log('Anula Solicitud Service:', anulaSolicitud);
    return this.http.post<IResponse>(
        `${environment.apiUrl}/enviarSolicitudCoordinador`,
        enviaSolicitud, { headers: this.headers, }
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    //console.log('Error Anulando Solicitud:', error);
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
