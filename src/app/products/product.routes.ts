import { Routes } from '@angular/router';
import ProductList from './features/product-list/product-list';
import ProductForm from './features/product-form/product-form';
import ProductDetails from './features/product-details/product-details';

const productRoutes: Routes = [
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
];

export default productRoutes;
