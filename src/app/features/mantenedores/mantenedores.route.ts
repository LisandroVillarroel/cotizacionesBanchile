import { Routes } from '@angular/router';
import { guardRoles } from '@core/auth/guards/guard.service';


export default [
  {
    path: 'usuarios',
    canActivate: [guardRoles(['ejec_bco','sup_corr'])],
    loadComponent: () =>
      import('@features/mantenedores/usuarios/usuarios.component'),
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
] as Routes;
