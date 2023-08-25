import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeControlDebtCustomerComponent } from './take-control-debt-customer.component';

describe('TakeControlDebtCustomerComponent', () => {
  let component: TakeControlDebtCustomerComponent;
  let fixture: ComponentFixture<TakeControlDebtCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeControlDebtCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeControlDebtCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
