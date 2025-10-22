// import { Injectable, signal } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, retry, throwError } from 'rxjs';
// import { InterfazRegistrarRespuesta, IRegistrarRespuesta} from '@shared/modelo/registrar-respuesta-interface';
// import { environment } from '@env/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrarRespuestaService {

//   // cotiPropuesta = signal<File | null>(null);
//   // cotiCia = signal<File | null>(null);

//   headers: HttpHeaders = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   });
//   constructor(private http: HttpClient) { }

//   registrarRespuesta(datos: IRegistrarRespuesta): Observable<InterfazRegistrarRespuesta> {
//   return this.http
//     .post<InterfazRegistrarRespuesta>(`${environment.apiUrl}/registrarRespuestaCompania`, datos, {
//       headers: this.headers
//     })
//     .pipe(retry(1), catchError(this.errorHandl));


//   }
//   errorHandl(error: HttpErrorResponse) {
//     console.log('paso error banco: ', error);
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log('Error: ', errorMessage);
//     return throwError(errorMessage);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { InterfazRegistrarRespuesta, IRegistrarRespuesta } from '@shared/modelo/registrar-respuesta-interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarRespuestaService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  registrarRespuesta(datos: IRegistrarRespuesta): Observable<InterfazRegistrarRespuesta> {
    return this.http
      .post<InterfazRegistrarRespuesta>(`${environment.apiUrl}/registrarRespuestaCompania`, datos, {
        headers: this.headers
      })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  private errorHandl(error: HttpErrorResponse) {
    console.log('paso error banco: ', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('Error: ', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
