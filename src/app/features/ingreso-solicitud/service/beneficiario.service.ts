import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IBeneficiario,
  IAgregaBeneficiario,
  IModificaBeneficiario,
  DatosBeneficiariosInterface,
} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaBeneficiario(agregaBeneficiario: IAgregaBeneficiario): Observable<any> {
    console.log('Agrega Beneficiario Service:', agregaBeneficiario);
    return this.http
      .post<any>(
        `${environment.apiUrl}/ingresarBeneficiario`,
        agregaBeneficiario,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  postModificaBeneficiario(modificaBeneficiario: IModificaBeneficiario): Observable<any> {
    console.log('Modifica Beneficiario Service:', modificaBeneficiario);
    return this.http
      .post<any>(
        `${environment.apiUrl}/modificarBeneficiario`,
        modificaBeneficiario,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  postEliminaBeneficiario(eliminaBeneficiario: IBeneficiario): Observable<any> {
    console.log('Elimina Beneficiario Service:', eliminaBeneficiario);
    return this.http
      .post<any>(
        `${environment.apiUrl}/eliminarBeneficiario`,
        eliminaBeneficiario,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  postListadoBeneficiario(filtro: any): Observable<DatosBeneficiariosInterface> {
    return this.http
      .post<DatosBeneficiariosInterface>(
        `${environment.apiUrl}/listarBeneficiarios`,
        filtro,
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  errorHand(error: HttpErrorResponse) {
    console.log('Paso Error Beneficiario: ', error);
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
