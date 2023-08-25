import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCustomerByProductCategoryComponent } from './track-customer-by-product-category.component';

describe('TrackCustomerByProductCategoryComponent', () => {
  let component: TrackCustomerByProductCategoryComponent;
  let fixture: ComponentFixture<TrackCustomerByProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCustomerByProductCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCustomerByProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
