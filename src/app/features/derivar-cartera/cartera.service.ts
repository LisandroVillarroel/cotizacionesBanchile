import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRequestGestion, IResponse } from '@shared/modelo/servicios-interface';
import { Observable } from 'rxjs';
import { ICarteraResponse, ICoordinadorResponse, IEjecutivoResponse, IRequestDeriva } from './cartera-interface';


@Injectable({
  providedIn: 'root'
})
export class CarteraService {

   private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
  constructor() { }

   postDerivarCartera(entrada: IRequestDeriva): Observable<IResponse> {
      return this.http
        .post<IResponse>(`${environment.apiUrlConsumer}/derivarCartera`,
          entrada,
          {headers: this.headers}
        )
    }

   postlistarCoordinadores(entrada: IRequestGestion): Observable<ICoordinadorResponse> {
      return this.http
        .post<ICoordinadorResponse>(`${environment.apiUrlConsumer}/listarCoordinadores`,
          entrada,
          {headers: this.headers}
        )
    }

   postlistarEjecutivos(entrada: IRequestGestion): Observable<IEjecutivoResponse> {
      return this.http
        .post<IEjecutivoResponse>(`${environment.apiUrlConsumer}/listarEjecutivos`,
          entrada,
          {headers: this.headers}
        )
    }

   postlistarCartera(entrada: IRequestGestion): Observable<ICarteraResponse> {
      return this.http
        .post<ICarteraResponse>(`${environment.apiUrlConsumer}/listarCartera`,
          entrada,
          {headers: this.headers}
        )
    }
}
