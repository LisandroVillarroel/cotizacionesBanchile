import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IRequest, IResponse } from '@shared/modelo/servicios-interface';
import { IApruebaCotRequest } from './aprobar-cotizacion-interface';

@Injectable({
  providedIn: 'root'
})
export class AprobarCotizacionService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postApruebaCotizacion(apruebaCotizacion: IApruebaCotRequest): Observable<IResponse> {
    //console.log('Anula Solicitud Service:', apruebaSolicitud);
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/aprobarCotizacion`,
        apruebaCotizacion, { headers: this.headers, }
      )
  }

}
