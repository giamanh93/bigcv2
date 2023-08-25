import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowDebtCustomerComponent } from './follow-debt-customer.component';

describe('FollowDebtCustomerComponent', () => {
  let component: FollowDebtCustomerComponent;
  let fixture: ComponentFixture<FollowDebtCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowDebtCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowDebtCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
