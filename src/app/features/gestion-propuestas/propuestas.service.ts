import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IGestionResponse } from '@features/gestion-solicitudes/gestionSolicitud-interface';


@Injectable({
  providedIn: 'root'
})
export class PropuestasService {
  private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

  postPropuestas(filtro: any): Observable<IGestionResponse> {
    return this.http
      .post<IGestionResponse>(`${environment.apiUrlConsumer}/listarGestionSolicitudes`, filtro,{headers: this.headers})
    }
}
