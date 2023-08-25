import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingUpCustomerComponent } from './comming-up-customer.component';

describe('CommingUpCustomerComponent', () => {
  let component: CommingUpCustomerComponent;
  let fixture: ComponentFixture<CommingUpCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommingUpCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommingUpCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
