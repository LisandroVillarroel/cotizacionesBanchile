import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable } from 'rxjs';
import { IMateriaEnvia, IMateriaResultado, IMateriaTiene } from '../modelo/materia-Interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });


  postListadoMatetria(idRubro: number,idSeguro:number): Observable<IMateriaResultado> {
        const filtro = {
      p_id_rubro: idRubro,
      p_id_tipo_seguro: idSeguro
    };
    return this.http
      .post<IMateriaResultado>(
        `${environment.apiUrl}/consultarPlantillaMateriaAsegurada`,
        filtro,
        { headers: this.headers }
      )
  }

   postConsultaMatetria(idSolicitud: number, idRubro:number,idSeguro:number): Observable<IMateriaTiene> {
    const filtro={
    "p_id_solicitud": idSolicitud,
    "p_id_rubro": idRubro,
    "p_id_tipo_seguro": idSeguro
}
    return this.http
      .post<IMateriaTiene>(
        `${environment.apiUrl}/consultarMateriaAsegurada`,
        filtro,
        { headers: this.headers }
      )
  }

    postAgregaAsegurado(agregaMateria: IMateriaEnvia): Observable<any> {
      console.log('datos de envio materia',agregaMateria)
      return this.http
        .post<any>(`${environment.apiUrl}/ingresarMateriaAsegurada`, agregaMateria, {
          headers: this.headers,
        })
    }


}
