import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable} from 'rxjs';
import { IAnulaRequest } from './anular-interface';
import { IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class AnularSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postAnulaSolicitud(anulaSolicitud: IAnulaRequest): Observable<IResponse> {
    //console.log('Anula Solicitud Service:', anulaSolicitud);
    return this.http.post<IResponse>(
        `${environment.apiUrlConsumer}/anularSolicitud`,
        anulaSolicitud, { headers: this.headers, }
      )
  }

}
