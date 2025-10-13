import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazRubro } from '@shared/modelo/rubro-interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

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
    console.log('CARGA RUBROS SERVICE')
    return this.http
      .get<InterfazRubro>(`${environment.apiUrl}/listarRubros`,{headers: this.headers})
  }

}
