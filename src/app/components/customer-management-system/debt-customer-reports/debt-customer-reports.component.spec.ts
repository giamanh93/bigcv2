import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtCustomerReportsComponent } from './debt-customer-reports.component';

describe('DebtCustomerReportsComponent', () => {
  let component: DebtCustomerReportsComponent;
  let fixture: ComponentFixture<DebtCustomerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtCustomerReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtCustomerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
