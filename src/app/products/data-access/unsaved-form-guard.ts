import { CanDeactivateFn } from '@angular/router';
import ProductForm from '../features/product-form/product-form';
import { inject } from '@angular/core';
import { ConfirmationService } from '../../shared/confirmation.service';

export const unsavedFormGuard: CanDeactivateFn<ProductForm> = (productForm) => {
  const confirmationService = inject(ConfirmationService);
  if (productForm.hasUnsavedChanges()) {
    return confirmationService.requestConfirmation('Desea salir sin guardar?');
  }
  return true;
};
