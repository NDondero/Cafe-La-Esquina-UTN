import { Routes } from '@angular/router';
import { ROUTE_SEGMENTS } from './app.route.segments';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_SEGMENTS.products,
  },
  {
    path: ROUTE_SEGMENTS.products,
    loadComponent: () => import('./products/ui/product-layout/product-layout'),
    loadChildren: () => import('./products/product.routes'),
  },
  {
    path: ROUTE_SEGMENTS.auth,
    loadComponent: () => import('./auth/ui/auth-layout/auth-layout'),
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: '**',
    redirectTo: ROUTE_SEGMENTS.products,
  },
];
