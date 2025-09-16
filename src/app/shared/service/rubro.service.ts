import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazRubro } from '@shared/modelo/rubro-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor() { }

  postRubro(): Observable<InterfazRubro> {
    return this.http
      .get<InterfazRubro>(`${environment.apiUrl}/lista-rubros`,{headers: this.headers})
      .pipe(retry(1), catchError(this.errorHandl));
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
