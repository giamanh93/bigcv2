import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProductCancelSupplierComponent } from './follow-product-cancel-supplier.component';

describe('FollowProductCancelSupplierComponent', () => {
  let component: FollowProductCancelSupplierComponent;
  let fixture: ComponentFixture<FollowProductCancelSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowProductCancelSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowProductCancelSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
