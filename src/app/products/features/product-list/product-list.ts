import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ProductClient } from '../../data-access/product-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../ui/product-card/product-card';
import { Router } from '@angular/router';
import { Product } from '../../data-access/product';
import { ROUTE_COMMANDS } from '../../../app.route.segments';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export default class ProductList {
  private readonly client = inject(ProductClient);
  private readonly router = inject(Router);

  private readonly productsSource = toSignal(this.client.getAllProducts());
  protected readonly products = linkedSignal(() => {
    let products = this.productsSource();
    if (!products) return [];
    const SaleOrFeatureFilter = this.filterBySaleOrFeatured();
    if (SaleOrFeatureFilter) {
      products =
        SaleOrFeatureFilter === 'isFeatured'
          ? products.filter((p) => p.isFeatured)
          : products.filter((p) => p.isOnSale);
    }
    const categoryFilter = this.filterByCategory();
    if (categoryFilter) {
      products = products.filter((p) => p.category === categoryFilter);
    }
    const nameFilter = this.filterByName().trim().toLocaleLowerCase();
    if (nameFilter) {
      products = products.filter((p) => p.name.toLocaleLowerCase().includes(nameFilter));
    }

    return this.toSortedByCategoryAndName(products);
  });
  protected readonly isLoaing = computed(() => this.productsSource() === undefined);

  protected readonly categories = ['Panadería', 'Pastelería', 'Facturas', 'Bebidas'];

  protected readonly filterBySaleOrFeatured = signal<'isOnSale' | 'isFeatured' | ''>('');
  protected readonly filterByName = signal<string>('');
  protected readonly filterByCategory = signal<string>('');

  protected readonly hasFilters = computed(() => {
    return (
      this.filterBySaleOrFeatured() !== '' ||
      this.filterByName() !== '' ||
      this.filterByCategory() !== ''
    );
  });

  cleanFilters() {
    this.filterBySaleOrFeatured.set('');
    this.filterByName.set('');
    this.filterByCategory.set('');
  }

  deleteProduct(id: string | number) {
    this.client.deleteProduct(id).subscribe((v) => {
      console.log(v);
      this.products.update((previousValue) => {
        return previousValue.filter((product) => product.id !== id);
      });
    });
  }

  navigateToDetails(id: string | number) {
    this.router.navigate(ROUTE_COMMANDS.productDetails(id));
  }

  private toSortedByCategoryAndName(products: Product[]) {
    return [...products].sort((a, b) => {
      const categoryComparator = a.category.localeCompare(b.category);
      return categoryComparator !== 0 ? categoryComparator : a.name.localeCompare(b.name);
    });
  }
}
