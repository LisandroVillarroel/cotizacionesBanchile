import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class EnviarCoordinadorService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postEnviaSolicitud(enviaSolicitud: any): Observable<IResponse> {
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/enviarSolicitudCoordinador`,
        enviaSolicitud, { headers: this.headers, }
      )
  }
}
