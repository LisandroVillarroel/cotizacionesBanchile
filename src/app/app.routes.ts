import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    pathMatch:'full',
    redirectTo:'ingreso'
  },

   {
    path: 'ingreso',
    loadComponent: () => import('@features/ingreso-solicitud/ingreso-solicitud.component'),
  },
];
