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
    canActivate: [guardRoles(['ejec_bco','sup_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/rubros/rubros.component'),
  },
  {
    path: 'tipo-seguro',
    canActivate: [guardRoles(['ejec_bco','sup_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/tipo-seguro/tipo-seguro.component'),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
] as Routes;
