import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazTipoSeguro } from '@shared/modelo/tipoSeguro-interface';
import { Observable } from 'rxjs';

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

  postTipoSeguro(idRubro: number): Observable<InterfazTipoSeguro> {
    const estructura_codigoRubro = { p_id_rubro: idRubro };
    return this.http
      .post<InterfazTipoSeguro>(`${environment.apiUrlConsumer}/listarProductos`, estructura_codigoRubro,{headers: this.headers})
  }

}
