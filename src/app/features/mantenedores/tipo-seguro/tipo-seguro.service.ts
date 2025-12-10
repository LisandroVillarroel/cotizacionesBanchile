import { InterfazTipoSeguro, ITipoSeguroUpdate, ITipoSeguro } from './tipo-seguro-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRequestGestion } from '@shared/modelo/servicios-interface';

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
postAgregaTipoSeguro(agregaTipoSeguro: ITipoSeguro): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/crearTipoSeguro`, agregaTipoSeguro, {
        headers: this.headers,
      })
  }

postModificaTipoSeguro(modificaTipoSeguro: ITipoSeguroUpdate): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlConsumer}/modificarTipoSeguro`, modificaTipoSeguro, {
        headers: this.headers,
      })
  }

    postTipoSeguro(postTipoSeguro: IRequestGestion): Observable<InterfazTipoSeguro> {
        return this.http
          .post<InterfazTipoSeguro>(`${environment.apiUrlConsumer}/listarTipoSeguros`,
            postTipoSeguro,
            { headers: this.headers })
      }
   }
