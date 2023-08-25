import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDebtComponent } from './customer-debt.component';

describe('CustomerDebtComponent', () => {
  let component: CustomerDebtComponent;
  let fixture: ComponentFixture<CustomerDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDebtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
