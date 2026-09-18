import { Component, input, output } from '@angular/core';
import { Product } from '../../data-access/product';

@Component({
  imports: [],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  public readonly product = input.required<Product>();
  public readonly navigationSelected = output<string | number>();
  public readonly productDeleted = output<string | number>();
}
