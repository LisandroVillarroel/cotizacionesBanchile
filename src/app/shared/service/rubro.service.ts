import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazRubro } from '@shared/modelo/rubro-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor() { }

  postRubro(): Observable<InterfazRubro> {
    return this.http
      .get<InterfazRubro>(`${environment.apiUrl}/listarRubros`,{headers: this.headers})
  }

}
