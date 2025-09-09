import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentosAsociadosService {
  obtenerRegistrosConDocumentos(): any[] {
    return [
      {
        id: 1,
        nombre: 'Cuestionario de Cotización',
        documentosAsociados: '',
      },
      {
        id: 2,
        nombre: 'Medidas de Seguridad',
        documentosAsociados: 'Seguridad.docx'
      },
      {
        id: 3,
        nombre: 'Documentos Adicionales',
        documentosAsociados:'Adicional.docx'
      }
      ,
      {
        id: 4,
        nombre: 'Presupuesto',
        documentosAsociados: 'Presupuesto.docx'
      }
      ,
      {
        id: 5,
        nombre: 'Carta Gantt',
        documentosAsociados:  'Gantt.docx'
      }
      ,
      {
        id: 6,
        nombre: 'Descripción de la obra',
        documentosAsociados:  'Descripción.docx'
      }
    ];
  }
}
