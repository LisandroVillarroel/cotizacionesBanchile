import { EstadoInterface } from '@shared/modelo/estado-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor() { }

  getEstado(): Observable<EstadoInterface> {
    return this.http
      .get<EstadoInterface>(`${environment.apiUrlConsumer}/listarEstado`,{headers: this.headers})
  }

}
