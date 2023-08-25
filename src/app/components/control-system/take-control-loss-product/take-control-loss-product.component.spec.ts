import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeControlLossProductComponent } from './take-control-loss-product.component';

describe('TakeControlLossProductComponent', () => {
  let component: TakeControlLossProductComponent;
  let fixture: ComponentFixture<TakeControlLossProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeControlLossProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeControlLossProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
