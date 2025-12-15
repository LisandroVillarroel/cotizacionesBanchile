import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazTipoCuenta } from '@shared/modelo/tipo-cuenta-interface';
import {  Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

   private http = inject(HttpClient);

      headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      constructor() { }

      postTipoCuenta(): Observable<InterfazTipoCuenta> {
        return this.http
          .get<InterfazTipoCuenta>(`${environment.apiUrlConsumer}/listarTipoCuenta`,{headers: this.headers})
      }


    }
