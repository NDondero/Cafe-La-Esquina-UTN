import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsLayout } from './products-layout';

describe('ProductsLayout', () => {
  let component: ProductsLayout;
  let fixture: ComponentFixture<ProductsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
