import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DetalleSolicitudInterface } from '@features/detalle-solicitud/modelo/detalle-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor() { }

  postDetalle(IdSolicitud: number): Observable<DetalleSolicitudInterface> {
    const parametro = {p_id_solicitud: IdSolicitud};
    return this.http
      .post<DetalleSolicitudInterface>(`${environment.apiUrlConsumer}/detalleSolicitud`, parametro,{headers: this.headers})
  }

}
