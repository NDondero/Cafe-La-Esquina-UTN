import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductClient } from '../../data-access/product-client';
import { Product } from '../../data-access/product';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export default class ProductForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly client = inject(ProductClient);

  public readonly editingProduct = input<Product>();
  protected readonly isEditing = computed(() => this.editingProduct() !== undefined);
  public readonly editted = output<Product>();

  ngOnInit(): void {
    const editingProduct = this.editingProduct();

    if (this.isEditing() && editingProduct) {
      this.productForm.patchValue(editingProduct);
    }
  }

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

    if (confirm('Desea confirmar los datos?')) {
      const product = this.productForm.getRawValue();
      const editingProduct = this.editingProduct();
      if (this.isEditing() && editingProduct) {
        const { id } = editingProduct;
        this.client.editProduct(product, id).subscribe((product) => {
          alert('Producto modificado con éxito!');
          this.editted.emit(product);
        });
      } else {
        this.client.addProduct(product).subscribe(() => {
          alert('Se Agrego el producto con éxito!');
          this.productForm.reset();
        });
      }
    }
  }
}
