import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementSystemComponent } from './customer-management-system.component';

describe('CustomerManagementSystemComponent', () => {
  let component: CustomerManagementSystemComponent;
  let fixture: ComponentFixture<CustomerManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
