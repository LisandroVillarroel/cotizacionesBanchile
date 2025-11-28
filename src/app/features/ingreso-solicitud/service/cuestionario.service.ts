import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  IIngresarDocumento,
  IEstadoIngresarDocumento,
  DatosDocumentoInterface,
} from '../modelo/ingresoSolicitud-Interface';
import { IResponse } from '@shared/modelo/servicios-interface';

// Definición base de documentos
const documentos_definicion = [
  { nombre: 'Cuestionario de cotización', tipo: 'Requerido' },
  { nombre: 'Carta Gantt', tipo: 'Opcional' },
  { nombre: 'Descripción de la obra', tipo: 'Opcional' },
  { nombre: 'Medidas de seguridad', tipo: 'Opcional' },
  { nombre: 'Plano/Layout de la obra', tipo: 'Opcional' },
  { nombre: 'Presupuesto', tipo: 'Opcional' },
  { nombre: 'Documentos adicionales', tipo: 'Opcional' },
];

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  private http = inject(HttpClient);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor() {}

  // Método para obtener la lista base de documentos
  getDocumentosBase(): IIngresarDocumento[] {
    return documentos_definicion.map((doc) => ({
      p_id_solicitud: 0,
      p_id_documento_adjunto: doc.nombre,
      p_documento_principal: doc.tipo,
      p_ruta_documento_origen: '',
      p_ruta_documento_destino: '',
      p_fecha_creacion: '',
      p_usuario_creacion: '',
    }));
  }

  postAgregaDocumento(
    agregaDocumento: IIngresarDocumento
  ): Observable<IEstadoIngresarDocumento> {
    console.log('Agrega Documento Service:', agregaDocumento);
    return this.http
      .post<IEstadoIngresarDocumento>(
        `${environment.apiUrlConsumer}/ingresarDocumento`,
        agregaDocumento,
        { headers: this.headers }
      )
  }

  /* postModificaDocumento(modificaDocumento: IAgregaAsegurado): Observable<any> {
    console.log('Modifica Documento Service:', modificaDocumento);
    return this.http
      .post<any>(
        `${environment.apiUrlConsumer}/modificarDocumentos`,
        modificaDocumento,
        {
          headers: this.headers,
        }
      )
      .pipe(retry(1), catchError(this.errorHand));
  } */

  postEliminaDocumento(
    idSolicitud: number,
    corr: number,
    usuario: string
  ): Observable<IResponse> {
    return this.http.post<IResponse>(`${environment.apiUrlConsumer}/eliminarDocumentos`, {
      p_id_solicitud: idSolicitud,
      p_corr_documento: corr,
      p_fecha_modificacion: new Date().toISOString(),
      p_usuario_modificacion: usuario, //
    });
  }

  postListadoDocumento(filtro: any): Observable<DatosDocumentoInterface> {
    return this.http
      .post<DatosDocumentoInterface>(
        `${environment.apiUrlConsumer}/consultarDocumentos`,
        filtro,
        { headers: this.headers }
      )
  }

}
