import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { ProductClient } from '../../data-access/product-client';
import { Product, ProductFormModel } from '../../data-access/product';
import { form, min, minLength, required, FormRoot, FormField } from '@angular/forms/signals';
import { ConfirmationService } from '../../../shared/confirmation.service';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  imports: [FormRoot, FormField, ConfirmDialog],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export default class ProductForm implements OnInit {
  private readonly client = inject(ProductClient);

  protected readonly confirmationService = inject(ConfirmationService);
  private readonly notificationService = inject(NotificationService);

  public readonly editingProduct = input<Product>();
  protected readonly isEditing = computed(() => this.editingProduct() !== undefined);
  public readonly editted = output<Product>();

  ngOnInit(): void {
    const editingProduct = this.editingProduct();

    if (this.isEditing() && editingProduct) {
      this.productFormModel.set(editingProduct);
    }
  }

  private readonly productFormModel = signal<ProductFormModel>({
    name: '',
    category: '',
    price: 0,
    description: '',
    isFeatured: false,
    isOnSale: false,
  });

  protected readonly productForm = form(
    this.productFormModel,
    (product) => {
      required(product.name, { message: 'Requerido*' });
      minLength(product.name, 3, { message: 'Nombre muy corto' });

      required(product.price, { message: 'Requerido*' });
      min(product.price, 1000, { message: 'El precio mínimo es $1000' });

      required(product.category, { message: 'Requerido*' });

      required(product.description, { message: 'Requerido*' });
    },
    {
      submission: {
        action: async (field) => {
          if (!(await this.confirmationService.requestConfirmation('Desea confirmar los datos?'))) {
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 500)); // simulamos latencia
          const product = field().value();
          const editingProduct = this.editingProduct();
          if (this.isEditing() && editingProduct) {
            const { id } = editingProduct;
            this.client.editProduct(product, id).subscribe((product) => {
              this.notificationService.show('Producto modificado con éxito!');
              this.editted.emit(product);
            });
          } else {
            this.client.addProduct(product).subscribe(() => {
              this.notificationService.show('Se Agrego el producto con éxito!');
              this.resetForm();
            });
          }
        },
      },
    },
  );

  protected readonly categories = ['Panadería', 'Pastelería', 'Facturas', 'Bebidas'];

  readonly hasUnsavedChanges = computed(() => {
    const state = this.productForm().value();
    const unsavedChanges =
      state.name !== '' || state.price !== 0 || state.category !== '' || state.description !== '';
    return (this.productForm().dirty() || this.productForm().touched()) && unsavedChanges;
  });

  resetForm() {
    this.productForm().reset({
      name: '',
      category: '',
      price: 0,
      description: '',
      isFeatured: false,
      isOnSale: false,
    });
  }
}
