import {  HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProgresoCarga } from '../progesoCarga';
import { delayWhen, finalize, of, timer } from 'rxjs';

export const cargaProgresoInterceptor: HttpInterceptorFn = (req, next) => {
  const progresoCarga = inject(ProgresoCarga);
  const minDelayMs = 500; // 2 segundos
  const startTime = Date.now();
progresoCarga.parar();
  progresoCarga.ejecutar(); // Mostrar barra de progreso al iniciar

  return next(req).pipe(
    delayWhen(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minDelayMs - elapsedTime;
      return remainingTime > 0 ? timer(remainingTime) : of(null);
    }),
    finalize(() => {
       setTimeout(() => {
            progresoCarga.parar(); // Ocultar la barra de progreso
          }, 1000);
    })
  );
};
