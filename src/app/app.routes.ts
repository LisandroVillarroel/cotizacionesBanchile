import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
    {
      path: 'login',
      loadComponent: () => import('@features/auth/auth.component')
    //  canActivate: [publicoGuard()],
    },
  {
    path: '',
    loadComponent: () => import('@core/layout/principal.component'),
    // canActivate: [privadoGuard()],
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('@features/dashboard/dashboard.component'),
      },
      {
        path: 'ingreso',
        loadComponent: () => import('@features/ingreso-solicitud/ingreso-solicitud.component'),
      },
      {
        path: 'gestion',
        loadComponent: () => import('@features/gestion-solicitudes/gestion-solicitudes.component'),
      },
      {
        path: 'detalle',
        loadComponent: () => import('@features/detalle-solicitud/detalle-solicitud.component'),
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
