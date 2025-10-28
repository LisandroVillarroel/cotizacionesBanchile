import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  IAsegurado,
  DatosAseguradosInterface,
} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaAsegurado(agregaAsegurado: IAsegurado): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/ingresarAsegurado`, agregaAsegurado, {
        headers: this.headers,
      })
  }

  postModificaAsegurado(modificaAsegurado: IAsegurado): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrlConsumer}/modificarAsegurado`,
        modificaAsegurado,
        {
          headers: this.headers,
        }
      )
  }

  postEliminaAsegurado(
    isolicitud: number,
    rutAsegurado: string
  ): Observable<any> {
    const parametro = {
      p_id_solicitud: isolicitud,
      p_rut_asegurado: rutAsegurado,
    };
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/eliminarAsegurado`, parametro, {
        headers: this.headers,
      })
  }

  postListadoAsegurado(filtro: any): Observable<DatosAseguradosInterface> {
    return this.http
      .post<DatosAseguradosInterface>(
        `${environment.apiUrlConsumer}/listarAsegurados`,
        filtro,
        { headers: this.headers }
      )
  }

}
