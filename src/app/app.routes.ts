import { Routes } from '@angular/router';
/* import ProductsLayout from './products/ui/products-layout/products-layout';
import ProductList from './products/features/product-list/product-list';
import ProductForm from './products/features/product-form/product-form';
import ProductDetails from './products/features/product-details/product-details'; */

export const routes: Routes = [
  {
    path: 'productos',
    /* component: ProductsLayout,
    children: [
      {
        path: '',
        component: ProductList,
      },
      {
        path: 'agregar',
        component: ProductForm,
      },
      {
        path: ':id',
        component: ProductDetails,
      },
    ], */
    loadComponent: () => import('./products/ui/products-layout/products-layout'),
    loadChildren: () => import('./products/products.routes')
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];
