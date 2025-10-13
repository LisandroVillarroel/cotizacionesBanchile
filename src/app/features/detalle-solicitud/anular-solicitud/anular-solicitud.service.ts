import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable} from 'rxjs';
import { IAnulaRequest, IAnulaResponse } from './anular-interface';

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

  postAnulaSolicitud(anulaSolicitud: IAnulaRequest): Observable<IAnulaResponse> {
    //console.log('Anula Solicitud Service:', anulaSolicitud);
    return this.http.post<IAnulaResponse>(
        `${environment.apiUrl}/anularSolicitud`,
        anulaSolicitud, { headers: this.headers, }
      )
  }

}
