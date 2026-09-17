import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'productos',
    loadComponent: () => import('./products/ui/product-layout/product-layout'),
    loadChildren: () => import('./products/product.routes')
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];
