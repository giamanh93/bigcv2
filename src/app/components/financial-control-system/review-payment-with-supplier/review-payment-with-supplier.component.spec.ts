import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPaymentWithSupplierComponent } from './review-payment-with-supplier.component';

describe('ReviewPaymentWithSupplierComponent', () => {
  let component: ReviewPaymentWithSupplierComponent;
  let fixture: ComponentFixture<ReviewPaymentWithSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPaymentWithSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPaymentWithSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
