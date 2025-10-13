import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { DatosSolicitudesInterface } from './datosSolicitud-Interface';

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

   postListadoSolicitudes(filtro: any): Observable<DatosSolicitudesInterface> {
      return this.http
        .post<DatosSolicitudesInterface>(`${environment.apiUrl}/listarSolicitudes`, filtro,{headers: this.headers})

    }

}
