import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IAgregaBeneficiario,  DatosBeneficiariosInterface,} from '../modelo/ingresoSolicitud-Interface';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}
  postAgregaBeneficiario(agregaBeneficiario: IAgregaBeneficiario): Observable<any> {
    console.log('Agrega Beneficiario Service:', agregaBeneficiario);
    return this.http
      .post<any>(
        `${environment.apiUrlConsumer}/ingresarBeneficiario`,
        agregaBeneficiario,
        {
          headers: this.headers,
        }
      )
  }

  postModificaBeneficiario(modificaBeneficiario: IAgregaBeneficiario): Observable<any> {
    console.log('Modifica Beneficiario Service:', modificaBeneficiario);
    return this.http
      .post<any>(
        `${environment.apiUrlConsumer}/modificarBeneficiario`,
        modificaBeneficiario,
        {
          headers: this.headers,
        }
      )
  }

  postEliminaBeneficiario(isolicitud: number,rutBeneficiario:string): Observable<any> {
   const parametro={p_id_solicitud:isolicitud, p_rut_beneficiario:rutBeneficiario}

    return this.http
      .post<any>(
        `${environment.apiUrlConsumer}/eliminarBeneficiario`,
        parametro,
        {
          headers: this.headers,
        }
      )
  }

  postListadoBeneficiario(filtro: any): Observable<DatosBeneficiariosInterface> {
    return this.http
      .post<DatosBeneficiariosInterface>(
        `${environment.apiUrlConsumer}/listarBeneficiarios`,
        filtro,
        { headers: this.headers }
      )
  }

}
