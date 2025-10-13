import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IIngresoSolicitud,
  IIngresoSolicitud_Recibe,
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

  constructor() {}

  postIngresoSolicitud(
    ingresoSolicitud: IIngresoSolicitud
  ): Observable<IIngresoSolicitud_Recibe> {
    console.log('Ingreso Solicitud Service:', ingresoSolicitud);
    return this.http
      .post<IIngresoSolicitud_Recibe>(
        `${environment.apiUrl}/ingresoSolicitud`,
        ingresoSolicitud,
        {
          headers: this.headers,
        }
      )
  }

}
