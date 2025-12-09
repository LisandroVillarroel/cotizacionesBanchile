import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IGestionResponse, IApruebaCotRequest } from './gestionCotizacion-interface';
import { IRequestGestion, IResponse } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class GestionCotizacionesService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  constructor() {}

  postListadoSolicitudes(filtro: IRequestGestion): Observable<IGestionResponse> {
    return this.http.post<IGestionResponse>(
      `${environment.apiUrlConsumer}/listarGestionCotizaciones`,
      filtro,
      { headers: this.headers },
    );
  }

  postApruebaCotizacion(apruebaCotizacion: IApruebaCotRequest): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrlConsumer}/aprobarCotizacion`,
      apruebaCotizacion,
      { headers: this.headers },
    );
  }
}
