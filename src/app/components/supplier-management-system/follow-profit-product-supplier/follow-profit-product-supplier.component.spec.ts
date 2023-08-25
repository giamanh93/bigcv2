import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProfitProductSupplierComponent } from './follow-profit-product-supplier.component';

describe('FollowProfitProductSupplierComponent', () => {
  let component: FollowProfitProductSupplierComponent;
  let fixture: ComponentFixture<FollowProfitProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowProfitProductSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowProfitProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
