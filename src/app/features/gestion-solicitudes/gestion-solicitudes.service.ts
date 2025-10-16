import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IGestionResponse } from './gestionSolicitud-interface';

@Injectable({
  providedIn: 'root'
})
export class GestionSolicitudesService {
   private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

  postListaGestion(filtro: any): Observable<IGestionResponse> {
    return this.http
      .post<IGestionResponse>(`${environment.apiUrl}/listarGestionSolicitudes`, filtro,{headers: this.headers})
    }

}
