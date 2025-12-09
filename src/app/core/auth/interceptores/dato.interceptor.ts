import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { tap } from 'rxjs';

export const datoInterceptor: HttpInterceptorFn = (req, next) => {
  const notificacioAlertnService = inject(NotificacioAlertnService);

  return next(req).pipe(
    // Utiliza 'tap' para examinar el flujo de la respuesta
    tap((event) => {
      // El flujo de eventos contiene varios tipos de eventos HTTP
      // Nos interesa específicamente el evento de respuesta final
      if (event.type === HttpEventType.Response) {
        // Captura el cuerpo de la respuesta

        const responseBody = event.body as ApiResponse;
        if (isResponseWithCodigo(responseBody)) {
          //console.log('responseBody',isResponseWithCodigo(responseBody))
          if (responseBody && responseBody.codigo) {
            if (responseBody.codigo != 200) {
              //console.log('errorrrrr:',event);
              void notificacioAlertnService.error('ERROR', responseBody.mensaje);
            }
          }
        }
      }
    }),
  );
};
interface ApiResponse {
  codigo: number;
  mensaje: string;
  // Añade aquí otras propiedades si existen
}

// Implementa un "type guard" para verificar el tipo en tiempo de ejecución
function isResponseWithCodigo(body: unknown): body is Response {
  return (
    typeof body === 'object' &&
    body !== null &&
    'codigo' in body &&
    typeof (body as ApiResponse).codigo === 'number'
  );
}
