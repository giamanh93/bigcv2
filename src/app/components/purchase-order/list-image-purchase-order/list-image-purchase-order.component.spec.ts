import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImagePurchaseOrderComponent } from './list-image-purchase-order.component';

describe('ListImagePurchaseOrderComponent', () => {
  let component: ListImagePurchaseOrderComponent;
  let fixture: ComponentFixture<ListImagePurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImagePurchaseOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImagePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
