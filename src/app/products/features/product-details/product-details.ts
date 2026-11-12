import { Component, inject, OnInit, signal } from '@angular/core';
import ProductForm from '../product-form/product-form';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductClient } from '../../data-access/product-client';
import { Product } from '../../data-access/product';
import { ROUTE_COMMANDS } from '../../../app.route.segments';
import { DialogModal } from '../../../shared/dialog-modal/dialog-modal';
import { ConfirmationService } from '../../../shared/confirmation.service';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  imports: [ProductForm, DialogModal, ConfirmDialog],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export default class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly client = inject(ProductClient);

  protected readonly confirmationService = inject(ConfirmationService);
  private readonly notificationService = inject(NotificationService);

  private readonly id = this.route.snapshot.paramMap.get('id')!;

  protected readonly product = signal<Product | undefined>(undefined);
  protected readonly isEditing = signal(false);

  ngOnInit() {
    this.client.getProductById(this.id).subscribe({
      next: (product) => {
        this.product.set(product);
      },
      error: () => {
        this.notificationService.show('Producto no encontrado. Redirigiendo...');
        setTimeout(() => {
          this.router.navigate(ROUTE_COMMANDS.products);
        }, 500);
      },
    });
  }

  onEditedProduct(product: Product) {
    this.isEditing.set(false);
    this.product.set(product);
  }

  async onProductDeleted() {
    if (!(await this.confirmationService.requestConfirmation('Desea borrar este producto?'))) {
      return;
    }
    const { id } = this.product()!;
    this.client.deleteProduct(id).subscribe(() => {
      this.notificationService.show('Producto eliminado con éxito, redirigiendo...');
      setTimeout(() => {
        this.router.navigate(ROUTE_COMMANDS.products);
      }, 500);
    });
  }
}
