import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCustomerByProductComponent } from './track-customer-by-product.component';

describe('TrackCustomerByProductComponent', () => {
  let component: TrackCustomerByProductComponent;
  let fixture: ComponentFixture<TrackCustomerByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCustomerByProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCustomerByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
