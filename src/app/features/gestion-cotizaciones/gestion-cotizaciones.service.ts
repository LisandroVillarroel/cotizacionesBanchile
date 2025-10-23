import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IGestionResponse, IRequestGestion } from './gestionCotizacion-interface';


@Injectable({
  providedIn: 'root'
})
export class GestionCotizacionesService {

   private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

   postListadoSolicitudes(filtro: IRequestGestion): Observable<IGestionResponse> {
      return this.http
        .post<IGestionResponse>(`${environment.apiUrlConsumer}/listarGestionCotizaciones`,
          filtro,
          {headers: this.headers}
        )
    }
}
