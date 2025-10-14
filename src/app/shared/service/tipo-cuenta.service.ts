import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazTipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

   private http = inject(HttpClient);

      headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      constructor() { }

      postTipoCuenta(): Observable<InterfazTipoCuenta> {
        return this.http
          .get<InterfazTipoCuenta>(`${environment.apiUrl}/listarTipoCuenta`,{headers: this.headers})
          .pipe(retry(1), catchError(this.errorHandl));
      }

          errorHandl(error: HttpErrorResponse) {
        console.log('paso error tipo cuenta: ', error);
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
