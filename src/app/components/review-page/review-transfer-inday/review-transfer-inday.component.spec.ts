import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTransferIndayComponent } from './review-transfer-inday.component';

describe('ReviewTransferIndayComponent', () => {
  let component: ReviewTransferIndayComponent;
  let fixture: ComponentFixture<ReviewTransferIndayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTransferIndayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTransferIndayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
