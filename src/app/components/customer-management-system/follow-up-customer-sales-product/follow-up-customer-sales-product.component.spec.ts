import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpCustomerSalesProductComponent } from './follow-up-customer-sales-product.component';

describe('FollowUpCustomerSalesProductComponent', () => {
  let component: FollowUpCustomerSalesProductComponent;
  let fixture: ComponentFixture<FollowUpCustomerSalesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpCustomerSalesProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpCustomerSalesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
