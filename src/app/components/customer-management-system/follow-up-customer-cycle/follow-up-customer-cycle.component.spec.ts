import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpCustomerCycleComponent } from './follow-up-customer-cycle.component';

describe('FollowUpCustomerCycleComponent', () => {
  let component: FollowUpCustomerCycleComponent;
  let fixture: ComponentFixture<FollowUpCustomerCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpCustomerCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpCustomerCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
