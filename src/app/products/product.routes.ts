import { Routes } from '@angular/router';
import ProductList from './features/product-list/product-list';
import ProductForm from './features/product-form/product-form';
import ProductDetails from './features/product-details/product-details';
import { authGuard } from '../auth/data-access/auth-guard';
import { unsavedFormGuard } from './data-access/unsaved-form-guard';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'agregar',
    component: ProductForm,
    canActivate: [authGuard],
    canDeactivate: [unsavedFormGuard]
  },
  {
    path: ':id',
    component: ProductDetails,
  },
];

export default productRoutes;
