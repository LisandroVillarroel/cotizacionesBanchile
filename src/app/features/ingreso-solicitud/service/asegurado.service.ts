import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IAgregaAsegurado,
  DatosAseguradosInterface,
} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaAsegurado(agregaAsegurado: IAgregaAsegurado): Observable<any> {
    console.log('Agrega Asegurado Service:', agregaAsegurado);
    return this.http
      .post<any>(`${environment.apiUrl}/ingresarAsegurado`, agregaAsegurado, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.errorHand));
  }

  postModificaAsegurado(modificaAsegurado: IAgregaAsegurado): Observable<any> {
    console.log('Modifica Asegurado Service:', modificaAsegurado);
    return this.http
      .post<any>(
        `${environment.apiUrl}/modificarAsegurado`,   modificaAsegurado,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  postEliminaAsegurado(isolicitud: number,rutAsegurado:string): Observable<any> {

   const parametro={p_id_solicitud:isolicitud, p_rut_asegurado:rutAsegurado}
   console.log('pazrametro elimina asegurado:', parametro)
    return this.http
      .post<any>(`${environment.apiUrl}/eliminarAsegurado`, parametro, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.errorHand));
  }

  postListadoAsegurado(filtro: any): Observable<DatosAseguradosInterface> {
    return this.http
      .post<DatosAseguradosInterface>(
        `${environment.apiUrl}/listarAsegurados`,
        filtro,
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

  errorHand(error: HttpErrorResponse) {
    console.log('Paso Error Asegurado: ', error);
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
