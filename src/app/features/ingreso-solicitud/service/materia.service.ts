import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IMateriaEnvia, IMateriaIngresa, IMateriaResultado, IMateriaTiene } from '../modelo/materia-Interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });


  postListadoMatetria(idRubro: number,idSeguro:number): Observable<IMateriaResultado> {
        const filtro = {
      p_id_rubro: idRubro,
      p_id_tipo_seguro: idSeguro
    };
    return this.http
      .post<IMateriaResultado>(
        `${environment.apiUrl}/consultarPlantillaMateriaAsegurada`,
        filtro,
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

   postConsultaMatetria(idSolicitud: number, idRubro:number,idSeguro:number): Observable<IMateriaTiene> {
    const filtro={
    "p_id_solicitud": idSolicitud,
    "p_id_rubro": idRubro,
    "p_id_tipo_seguro": idSeguro
}
    return this.http
      .post<IMateriaTiene>(
        `${environment.apiUrl}/consultarMateriaAsegurada`,
        filtro,
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.errorHand));
  }

    postAgregaAsegurado(agregaMateria: IMateriaEnvia): Observable<any> {
      console.log('datos de envio materia',agregaMateria)
      return this.http
        .post<any>(`${environment.apiUrl}/ingresarMateriaAsegurada`, agregaMateria, {
          headers: this.headers,
        })
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
