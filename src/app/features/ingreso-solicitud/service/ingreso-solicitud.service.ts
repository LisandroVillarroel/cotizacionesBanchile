import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
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
    return this.http.post<IIngresoSolicitud_Recibe>(
      `${environment.apiUrlConsumer}/ingresoSolicitud`,
      ingresoSolicitud,
      {
        headers: this.headers,
      }
    );
  }

  //Este es el servicio que llama a URL de prueba que está en el servidor local para cliente Banco
  getDatosContratante(rut: string): Observable<any> {
    const url = `http://192.168.1.36:8082/ms-pseg-cotizaciones/cotizaciones/clientesQms_pruebalocal/${rut}`;
    console.log('Llamando a URL:', url);
    return this.http.get<any>(url, { headers: this.headers });
  }
}
