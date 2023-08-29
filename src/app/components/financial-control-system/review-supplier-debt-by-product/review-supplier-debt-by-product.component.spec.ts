import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSupplierDebtByProductComponent } from './review-supplier-debt-by-product.component';

describe('ReviewSupplierDebtByProductComponent', () => {
  let component: ReviewSupplierDebtByProductComponent;
  let fixture: ComponentFixture<ReviewSupplierDebtByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSupplierDebtByProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSupplierDebtByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
