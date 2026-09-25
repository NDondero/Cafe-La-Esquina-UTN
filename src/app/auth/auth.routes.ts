import { Routes } from '@angular/router';

const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login'),
  },
];

export default authRoutes;
