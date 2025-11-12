import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@shared/modelo/servicios-interface';
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
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/aprobarCotizacion`,
        apruebaCotizacion, { headers: this.headers, }
      )
  }

}
