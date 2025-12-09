import { InterfazRubro } from './rubros-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RubrosService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  constructor() {}

  postRubros(): Observable<InterfazRubro> {
    return this.http.get<InterfazRubro>(`${environment.apiUrlConsumer}/listarRubros`, {
      headers: this.headers,
    });
  }
}
