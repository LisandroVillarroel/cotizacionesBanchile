import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  InterfazModificarRespuesta,
  IModificarRespuesta,
} from '@shared/modelo/modificar-respuesta-interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ModificarRespuestaService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(private http: HttpClient) {}

  modificarRespuesta(
    datos: IModificarRespuesta
  ): Observable<InterfazModificarRespuesta> {
    return this.http.post<InterfazModificarRespuesta>(
      `${environment.apiUrlConsumer}/modificarRespuestaCompania`,
      datos,
      { headers: this.headers }
    );
  }
}
