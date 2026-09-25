import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productos',
  },
  {
    path: 'productos',
    loadComponent: () => import('./products/ui/product-layout/product-layout'),
    loadChildren: () => import('./products/product.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/ui/auth-layout/auth-layout'),
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: '**',
    redirectTo: 'productos',
  },
];
