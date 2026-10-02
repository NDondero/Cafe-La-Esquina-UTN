import { Routes } from '@angular/router';
import { ROUTE_SEGMENTS } from '../app.route.segments';

const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_SEGMENTS.login,
  },
  {
    path: ROUTE_SEGMENTS.login,
    loadComponent: () => import('./features/login/login'),
  },
];

export default authRoutes;
