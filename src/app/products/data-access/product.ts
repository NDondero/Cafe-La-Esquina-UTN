export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  description: string;
  isFeatured: boolean;
  isOnSale: boolean;
  /* createdAt: Date; */
}

export type ProductFormModel = Omit<Product, 'id'>;
