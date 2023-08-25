import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowEffectivePromotionSupplierComponent } from './follow-effective-promotion-supplier.component';

describe('FollowEffectivePromotionSupplierComponent', () => {
  let component: FollowEffectivePromotionSupplierComponent;
  let fixture: ComponentFixture<FollowEffectivePromotionSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowEffectivePromotionSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowEffectivePromotionSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
