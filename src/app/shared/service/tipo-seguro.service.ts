import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazTipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoSeguroService {

  private http = inject(HttpClient);

   headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

  constructor() { }

  postTipoSeguro(idRubro: any): Observable<InterfazTipoSeguro> {
    return this.http
      .post<InterfazTipoSeguro>(`${environment.apiUrlConsumer}/listarProductos`, idRubro,{headers: this.headers})
  }

}
