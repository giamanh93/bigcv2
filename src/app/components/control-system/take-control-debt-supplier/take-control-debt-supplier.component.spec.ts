import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeControlDebtSupplierComponent } from './take-control-debt-supplier.component';

describe('TakeControlDebtSupplierComponent', () => {
  let component: TakeControlDebtSupplierComponent;
  let fixture: ComponentFixture<TakeControlDebtSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeControlDebtSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeControlDebtSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
