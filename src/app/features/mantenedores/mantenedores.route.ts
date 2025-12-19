import { Routes } from '@angular/router';
import { guardRoles } from '@core/auth/guards/guard.service';

export default [
  {
    path: 'usuarios',
    canActivate: [guardRoles(['adm_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/usuarios/usuarios.component'),
  },
   {
    path: 'rubros',
    canActivate: [guardRoles(['adm_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/rubros/rubros.component'),
  },
  {
    path: 'tipo-seguro',
    canActivate: [guardRoles(['adm_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/tipo-seguro/tipo-seguro.component'),
  },
  {
    path: 'companias',
    canActivate: [guardRoles(['adm_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/companias/companias.component'),
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
] as Routes;
