import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IMateriaEnvia, IMateriaResultado, IMateriaTiene } from '../modelo/materia-Interface';
import { IResponse } from '@shared/modelo/servicios-interface';

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
        `${environment.apiUrlConsumer}/consultarPlantillaMateriaAsegurada`,
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
        `${environment.apiUrlConsumer}/consultarMateriaAsegurada`,
        filtro,
        { headers: this.headers }
      )
  }

  postAgregaMateria(agregaMateria: IMateriaEnvia): Observable<IResponse> {
    //console.log('datos de envio materia',agregaMateria)
    return this.http
      .post<IResponse>(`${environment.apiUrlConsumer}/ingresarMateriaAsegurada`,
        agregaMateria, { headers: this.headers })
  }
}
