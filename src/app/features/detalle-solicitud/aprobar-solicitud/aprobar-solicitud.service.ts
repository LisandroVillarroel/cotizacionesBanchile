import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {  Observable } from 'rxjs';
import { IRequest, IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class AprobarSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postApruebaSolicitud(apruebaSolicitud: IRequest): Observable<IResponse> {
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/aprobarSolicitud`,
        apruebaSolicitud, { headers: this.headers, }
      )
  }

}
