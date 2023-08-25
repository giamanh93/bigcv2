import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierManagementSystemComponent } from './supplier-management-system.component';

describe('SupplierManagementSystemComponent', () => {
  let component: SupplierManagementSystemComponent;
  let fixture: ComponentFixture<SupplierManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
