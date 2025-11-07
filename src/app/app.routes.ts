import { Routes } from '@angular/router';
import { guardRoles, privadoGuardMatch } from '@core/auth/guards/guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
    {
      path: 'login',
      loadComponent: () => import('@features/auth/auth.component')
    //  canActivate: [publicoGuard()],
    },
  {
    path: '',
    loadComponent: () => import('@core/layout/principal.component'),
     canMatch: [privadoGuardMatch],
    children: [
      {
        path: 'inicio',
        canActivate: [guardRoles(['ejec_bco', 'coord_corr', 'sup_corr'])],

        loadComponent: () => import('@features/dashboard/dashboard.component'),
      },
      {
        path: 'ingreso',
        canActivate: [guardRoles(['ejec_bco'])],
        loadComponent: () => import('@features/ingreso-solicitud/ingreso-solicitud.component'),
      },
      {
        path: 'gestion',
        canActivate: [guardRoles(['coord_corr', 'sup_corr'])],
        loadComponent: () => import('@features/gestion-solicitudes/gestion-solicitudes.component'),
      },
      {
        canActivate: [guardRoles(['ejec_bco','coord_corr'])],
        path: 'detalle',
        loadComponent: () => import('@features/detalle-solicitud/detalle-solicitud.component'),
      },
      {
        path: 'cotizaciones',
        canActivate: [guardRoles(['ejec_bco'])],
        loadComponent: () => import('@features/gestion-cotizaciones/gestion-cotizaciones.component'),
      },
      {
        path: 'derivar',
        canActivate: [guardRoles(['sup_corr'])],
        loadComponent: () => import('@features/derivar-cartera/derivar-cartera.component'),
      },
    ],
    //loadComponent: () => import('./componentes/portada/portada.component'),
  },
  /*
     {
      path: 'secundario',
      loadComponent: () => import('@core/layout2/principal.component'),
     // canActivate: [privadoGuard()],
      children: [
        {
          path: 'inicio2',
          loadComponent: () => import('@features/dashboard/dashboard.component'),
        },
        {
          path: 'ingreso2',
          loadComponent: () => import('@features/ingreso-solicitud/ingreso-solicitud.component'),
        },
      ],
      //loadComponent: () => import('./componentes/portada/portada.component'),
    },
    */

];
