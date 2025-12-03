import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InterfazBanco } from '@shared/modelo/banco-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

 private http = inject(HttpClient);

     headers: HttpHeaders = new HttpHeaders({
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     });
     constructor() { }

     postBanco(): Observable<InterfazBanco> {
       return this.http
         .get<InterfazBanco>(`${environment.apiUrlConsumer}/listarBanco`,{headers: this.headers})
     }
   }
