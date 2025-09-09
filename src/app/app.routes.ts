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
    ],
    //loadComponent: () => import('./componentes/portada/portada.component'),
  },
  {
    path: 'inicio',
    loadComponent: () => import('@features/dashboard/dashboard.component'),
  },
  {
    path: 'distribucion',
    loadComponent: () => import('@features/dashboard/distribucion/distribucion.component'),
  },
  {
    path: 'detalle',
    loadComponent: () => import('@features/detalle-solicitud/detalle-solicitud.component'),
  },
];
