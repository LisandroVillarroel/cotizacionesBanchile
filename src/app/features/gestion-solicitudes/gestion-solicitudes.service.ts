import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IGestionResponse } from './gestionSolicitud-interface';

@Injectable({
  providedIn: 'root'
})
export class GestionSolicitudesService {
   private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

  postListaGestion(filtro: any): Observable<IGestionResponse> {
    return this.http
      .post<IGestionResponse>(`${environment.apiUrl}/listarGestionSolicitudes`, filtro,{headers: this.headers})
      .pipe(retry(1), catchError(this.errorHandl));
    }

    errorHandl(error: HttpErrorResponse) {
      console.log('Error listar solicitudes: ', error);
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
