import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowInventorySupplierComponent } from './follow-inventory-supplier.component';

describe('FollowInventorySupplierComponent', () => {
  let component: FollowInventorySupplierComponent;
  let fixture: ComponentFixture<FollowInventorySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowInventorySupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowInventorySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
