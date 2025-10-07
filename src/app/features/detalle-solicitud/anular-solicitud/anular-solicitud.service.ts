import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IAnulaRequest, IAnulaResponse } from './anular-interface';

@Injectable({
  providedIn: 'root'
})
export class AnularSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postAnulaSolicitud(anulaSolicitud: IAnulaRequest): Observable<IAnulaResponse> {
    console.log('Anula Solicitud Service:', anulaSolicitud);
    return this.http.post<IAnulaResponse>(
        `${environment.apiUrl}/anularSolicitud`,
        anulaSolicitud, { headers: this.headers, }
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('Error Anulando Solicitud:', error);
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
