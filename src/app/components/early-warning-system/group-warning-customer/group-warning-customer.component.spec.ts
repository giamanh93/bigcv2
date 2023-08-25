import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWarningCustomerComponent } from './group-warning-customer.component';

describe('GroupWarningCustomerComponent', () => {
  let component: GroupWarningCustomerComponent;
  let fixture: ComponentFixture<GroupWarningCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupWarningCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupWarningCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
