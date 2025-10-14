import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  IAgregaAsegurado,
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
  postAgregaAsegurado(agregaAsegurado: IAgregaAsegurado): Observable<any> {
    console.log('Agrega Asegurado Service:', agregaAsegurado);
    return this.http
      .post<any>(`${environment.apiUrl}/ingresarAsegurado`, agregaAsegurado, {
        headers: this.headers,
      })
  }

  postModificaAsegurado(modificaAsegurado: IAgregaAsegurado): Observable<any> {
    console.log('Modifica Asegurado Service:', modificaAsegurado);
    return this.http
      .post<any>(
        `${environment.apiUrl}/modificarAsegurado`,
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
    console.log('Parametro Elimina Asegurado:', parametro);
    return this.http
      .post<any>(`${environment.apiUrl}/eliminarAsegurado`, parametro, {
        headers: this.headers,
      })
  }

  postListadoAsegurado(filtro: any): Observable<DatosAseguradosInterface> {
    return this.http
      .post<DatosAseguradosInterface>(
        `${environment.apiUrl}/listarAsegurados`,
        filtro,
        { headers: this.headers }
      )
  }

}
