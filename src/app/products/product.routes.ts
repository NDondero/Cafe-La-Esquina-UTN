import { Routes } from '@angular/router';
import ProductList from './features/product-list/product-list';
import ProductForm from './features/product-form/product-form';
import ProductDetails from './features/product-details/product-details';
import { authGuard } from '../auth/data-access/auth-guard';
import { unsavedFormGuard } from './data-access/unsaved-form-guard';
import { ROUTE_SEGMENTS } from '../app.route.segments';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: ROUTE_SEGMENTS.addProduct,
    component: ProductForm,
    canActivate: [authGuard],
    canDeactivate: [unsavedFormGuard]
  },
  {
    path: ROUTE_SEGMENTS.productDetails,
    component: ProductDetails,
  },
];

export default productRoutes;
