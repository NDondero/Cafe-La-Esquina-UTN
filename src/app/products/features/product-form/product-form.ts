import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductClient } from '../../data-access/product-client';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export default class ProductForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly client = inject(ProductClient);
  /* protected readonly productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // ...
  }) */

  protected readonly productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1000)]],
    category: ['', Validators.required],
    description: ['', Validators.required],
    isFeatured: [false],
    isOnSale: [false],
  });

  protected readonly categories = ['Panadería', 'Pastelería', 'Facturas', 'Bebidas'];

  get name() {
    return this.productForm.controls.name;
  }

  get category() {
    return this.productForm.controls.category;
  }

  get description() {
    return this.productForm.controls.description;
  }

  subtmitForm() {
    console.log('enviando');
    if (this.productForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    const product = this.productForm.getRawValue();
    console.log(product);

    this.client.addProduct(product).subscribe(() => {
      alert('Se Agrego el producto con éxito!');
      this.productForm.reset();
    });
  }
}
