import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
/*  {
    path: 'login',
    loadComponent: () => import('@autentica/pages/login/login'),
    canActivate: [publicoGuard()],
  },*/
  {
    path: 'principal',
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
    ],
    //loadComponent: () => import('./componentes/portada/portada.component'),
  },

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
];
