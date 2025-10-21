import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ICompaniaResponse } from '@features/detalle-solicitud/modelo/detalle-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniasContactadasService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor() { }

  postCompanias(IdSolicitud: number): Observable<ICompaniaResponse> {
    const parametro = {p_id_solicitud: IdSolicitud};
    return this.http
      .post<ICompaniaResponse>(
        `${environment.apiUrl}/listarCompaniasContactadas`,
        parametro,
        { headers: this.headers
      })
  }
}
