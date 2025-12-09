import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DetalleSolicitudInterface } from '@features/detalle-solicitud/modelo/detalle-interface';
import { IRequest, IResponse } from '@shared/modelo/servicios-interface';
import { RequestInterface } from '../modelo/request-interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleSolicitudService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postDetalle(IdSolicitud: number): Observable<DetalleSolicitudInterface> {
    const parametro = { p_id_solicitud: IdSolicitud };
    return this.http.post<DetalleSolicitudInterface>(
      `${environment.apiUrlConsumer}/detalleSolicitud`,
      parametro,
      { headers: this.headers },
    );
  }

  postDevuelveSolicitud(devuelveSolicitud: RequestInterface): Observable<IResponse> {
    //console.log('Devuelve Solicitud Service:', devuelveSolicitud);
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/devolverSolicitud`,
      devuelveSolicitud,
      { headers: this.headers },
    );
  }

  postApruebaSolicitud(apruebaSolicitud: IRequest): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/aprobarSolicitud`,
      apruebaSolicitud,
      { headers: this.headers },
    );
  }

  postEnviaSolicitud(enviaSolicitud: IRequest): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/enviarSolicitudCoordinador`,
      enviaSolicitud,
      { headers: this.headers },
    );
  }

  postAnulaSolicitud(anulaSolicitud: RequestInterface): Observable<IResponse> {
    //console.log('Anula Solicitud Service:', anulaSolicitud);
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/anularSolicitud`,
      anulaSolicitud,
      { headers: this.headers },
    );
  }
}
