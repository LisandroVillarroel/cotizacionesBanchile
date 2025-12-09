import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IResponse, IRequest } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root',
})
export class GenerarPropuestaService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  postGeneraPropuesta(req: IRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${environment.apiUrlConsumer}/generarPropuesta`, req, {
      headers: this.headers,
    });
  }
}
