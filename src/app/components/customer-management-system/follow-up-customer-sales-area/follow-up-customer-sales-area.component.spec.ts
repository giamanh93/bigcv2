import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpCustomerSalesAreaComponent } from './follow-up-customer-sales-area.component';

describe('FollowUpCustomerSalesAreaComponent', () => {
  let component: FollowUpCustomerSalesAreaComponent;
  let fixture: ComponentFixture<FollowUpCustomerSalesAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpCustomerSalesAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpCustomerSalesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
