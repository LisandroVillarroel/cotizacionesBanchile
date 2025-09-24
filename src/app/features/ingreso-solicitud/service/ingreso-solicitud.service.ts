import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IEstadoIngresoSolicitud,
  IIngresoSolicitud,
} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class IngresoSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  ingreso: IIngresoSolicitud = {
    id_ejecutivo_banco: 'LISANDRO VILLARROEL',
    id_rubro: 'AUTOMOTRIZ',
    id_tipo_seguro: 'ASISTENCIA EN VIAJES',
    contratante: {
      rut_contratante: '11.118.901-9',
      nombre_razon_social_contratante: 'Carlos Torres Navarro',
      mail_contratante: 'Carlos.Torres.Navarro@gmail.com',
      telefono_contratante: '1181111111',
      region_contratante: 'Arica y Parinacota',
      ciudad_contratante: 'Putre',
      comuna_contratante: 'Putre',
      direccion_contratante: 'Arturo Prat',
      numero_dir_contratante: '1186',
      departamento_block_contratante: '',
      casa_contratante: '',
    },
    beneficiarios: [],
  };

  constructor() {}

  postIngresoSolicitud(ingresoSolicitud: IIngresoSolicitud): Observable<any> {
    console.log('Ingreso Solicitud Service:', ingresoSolicitud);
    return this.http
      .post<any>(`${environment.apiUrl}/ingreso-solicitud`, ingresoSolicitud, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('paso error tipo seguro: ', error);
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
