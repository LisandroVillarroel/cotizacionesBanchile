import { InterfazMedioPago } from './../modelo/medio-pago-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {
private http = inject(HttpClient);

    headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    constructor() { }

    postMedioPago(): Observable<InterfazMedioPago> {
      return this.http
        .get<InterfazMedioPago>(`${environment.apiUrlConsumer}/listarMedioPago`,{headers: this.headers})
    }


  }
