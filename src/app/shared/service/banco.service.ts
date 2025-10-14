import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazBanco } from '@shared/modelo/banco-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

 private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     });
     constructor() { }

     postBanco(): Observable<InterfazBanco> {
       return this.http
         .get<InterfazBanco>(`${environment.apiUrl}/listarBanco`,{headers: this.headers})
         .pipe(retry(1), catchError(this.errorHandl));
     }

         errorHandl(error: HttpErrorResponse) {
       console.log('paso error banco: ', error);
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
