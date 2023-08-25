import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRevenueWithFlowOfMoneyComponent } from './review-revenue-with-flow-of-money.component';

describe('ReviewRevenueWithFlowOfMoneyComponent', () => {
  let component: ReviewRevenueWithFlowOfMoneyComponent;
  let fixture: ComponentFixture<ReviewRevenueWithFlowOfMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRevenueWithFlowOfMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRevenueWithFlowOfMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
