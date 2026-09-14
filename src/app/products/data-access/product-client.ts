import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, ProductFormModel } from './product';

@Service()
export class ProductClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: string | number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`); // this.baseUrl + '/' + id
  }

  addProduct(newProduct: ProductFormModel) {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  editProduct(edittedProduct: ProductFormModel, id: string | number) {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, edittedProduct);
  }

  deleteProduct(id: string | number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
