import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    tap({
      error: () => {
        snackBar.open('ERROR DE CONEXIÓN', 'Cerrar');
      },
    }),
  );
};
