import { Component, inject, linkedSignal, signal } from '@angular/core';
import ProductForm from '../product-form/product-form';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductClient } from '../../data-access/product-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../data-access/product';

@Component({
  imports: [ProductForm],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export default class ProductDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly client = inject(ProductClient);

  private readonly id = this.route.snapshot.paramMap.get('id')!;

  protected readonly productSource = toSignal(this.client.getProductById(this.id));
  protected readonly product = linkedSignal(() => this.productSource());
  protected readonly isEditing = signal(false);

  onEditedProduct(product: Product) {
    this.isEditing.set(false);
    this.product.set(product);
  }

  onProductDeleted() {
    const { id } = this.product()!;
    this.client.deleteProduct(id).subscribe(() => {
      alert('Producto eliminado con éxito, redirigiendo...');
      this.router.navigateByUrl('productos');
    });
  }
}
