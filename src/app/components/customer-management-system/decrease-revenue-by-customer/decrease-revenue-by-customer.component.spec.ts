import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseRevenueByCustomerComponent } from './decrease-revenue-by-customer.component';

describe('DecreaseRevenueByCustomerComponent', () => {
  let component: DecreaseRevenueByCustomerComponent;
  let fixture: ComponentFixture<DecreaseRevenueByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecreaseRevenueByCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecreaseRevenueByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
