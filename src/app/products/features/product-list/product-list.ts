import { Component, computed, inject, linkedSignal } from '@angular/core';
import { ProductClient } from '../../data-access/product-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../ui/product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export default class ProductList {
  private readonly client = inject(ProductClient);

  private readonly productsSource = toSignal(this.client.getAllProducts());
  protected readonly products = linkedSignal(() => {
    const products = this.productsSource();
    return products ? products : [];
  });
  protected readonly isLoaing = computed(() => this.productsSource() === undefined);

  deleteProduct(id: string | number) {
    this.client.deleteProduct(id).subscribe((v) => {
      console.log(v);
      this.products.update((previousValue) => {
        return previousValue.filter((product) => product.id !== id);
      });
    });
  }
}
