import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazMoneda } from '@shared/modelo/moneda-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  constructor() {}

  postMoneda(): Observable<InterfazMoneda> {
    return this.http.get<InterfazMoneda>(`${environment.apiUrlConsumer}/listarMoneda`, {
      headers: this.headers,
    });
  }
}
