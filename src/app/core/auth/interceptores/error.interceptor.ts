import {  HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar)
  return next(req).pipe(
    retry({count: 3, delay:1000}),
    tap({
      error:(error:HttpErrorResponse)=>{
        snackBar.open('ERROR DE CONEXIÓN','Cerrar')
      }
    })
  )
};
