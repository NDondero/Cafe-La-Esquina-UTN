import { CanDeactivateFn } from '@angular/router';
import ProductForm from '../features/product-form/product-form';

export const unsavedFormGuard: CanDeactivateFn<ProductForm> = (productForm) => {
  if (productForm.hasUnsavedChanges()) {
    return window.confirm('Desea salir sin guardar?');
  }
  return true;
};
