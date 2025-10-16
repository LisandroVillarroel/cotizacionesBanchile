import { HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { tap } from 'rxjs';
import { ProgresoCarga } from '../progesoCarga';

export const datoInterceptor: HttpInterceptorFn = (req, next) => {
  const notificacioAlertnService = inject(NotificacioAlertnService);
  const progresoCarga = inject(ProgresoCarga);

  const tiempoMinimoMs = 2000;
  progresoCarga.ejecutar();
  return next(req).pipe(
    // Utiliza 'tap' para examinar el flujo de la respuesta
    tap(event => {
      // El flujo de eventos contiene varios tipos de eventos HTTP
      // Nos interesa específicamente el evento de respuesta final
      if (event.type === HttpEventType.Response) {
        const inicio = Date.now();
        const tiempoRealDeCarga = Math.random() * 2000; // Carga de 0 a 2 segundos

        setTimeout(() => {
          const tiempoTranscurrido = Date.now() - inicio;

          // Calcular el tiempo restante para cumplir con el mínimo
          const tiempoRestante = Math.max(0, tiempoMinimoMs - tiempoTranscurrido);

          setTimeout(() => {
            progresoCarga.parar(); // Ocultar la barra de progreso
          }, tiempoRestante);

        }, tiempoRealDeCarga);



        const responseBody = event.body as ApiResponse;


        if (isResponseWithCodigo(responseBody)) {

          console.log('responseBody', isResponseWithCodigo(responseBody))

          if (responseBody && responseBody.codigo) {

            if (responseBody.codigo != 200) {
              notificacioAlertnService.error('ERROR', responseBody.mensaje);
            }
          }
        }
      }
    })
  );
}
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
