import { inject, signal } from '@angular/core';
import { CanActivateFn, CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { EstadoService } from './estado.service';
import { UsuarioRoles } from '@features/auth/auth-Interface';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { Location } from '@angular/common';

export const privadoGuardMatch: CanMatchFn =(
  route,
  segments
):MaybeAsync<GuardResult>=> {
    const autenticaEstado = inject(EstadoService);
    const router = inject(Router);

    const sesion = autenticaEstado.getSesion();
    console.log('sesion guard:', sesion);

    if (sesion) return true;

    //router.navigateByUrl('login');
    return router.createUrlTree(['/login']);
};


export const guardRoles  =(roles:UsuarioRoles[]) : CanActivateFn=>{
  return () => {
    const rolUsduasrio=inject(StorageService).get<ISesionInterface>('sesion')?.usuarioLogin.perfilUsuario;
    if (roles.some(rol=> rol.includes(rolUsduasrio!)))
        return true;
    else{
     inject(Location).back();
      return false
    }

  }
}

/*
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
*/
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
