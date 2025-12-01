import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { DatosSolicitudesInterface } from './datosSolicitud-Interface';
import { IRequestFecha } from '@shared/modelo/servicios-interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

   postListadoSolicitudes(filtro: IRequestFecha): Observable<DatosSolicitudesInterface> {
      return this.http
        .post<DatosSolicitudesInterface>(`${environment.apiUrlConsumer}/listarSolicitudes`,
          filtro,
          {headers: this.headers}
        )
    }
}
