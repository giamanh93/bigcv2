import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSupplierDebtComponent } from './review-supplier-debt.component';

describe('ReviewSupplierDebtComponent', () => {
  let component: ReviewSupplierDebtComponent;
  let fixture: ComponentFixture<ReviewSupplierDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSupplierDebtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSupplierDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
