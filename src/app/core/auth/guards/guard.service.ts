import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EstadoService } from './estado.service';


export const privadoGuard = (): CanActivateFn => {
  return () => {
    const autenticaEstado = inject(EstadoService);
    const router = inject(Router);

    const sesion = autenticaEstado.getSesion();
    console.log('sesion guard:', sesion);

    if (sesion) return true;

    //router.navigateByUrl('login');
    return router.parseUrl('/login');
  };
};

export const publicoGuard = (): CanActivateFn => {
  return () => {
    const autenticaEstado = inject(EstadoService);
    const router = inject(Router);

    const sesion = autenticaEstado.getSesion();
    //console.log('sesion guard:', sesion);
    if (!sesion) return true;

    // router.navigateByUrl('auth/login');
    //  router.parseUrl('/portada');
    return router.navigate(['inicio']);
  };
};
