import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeControlLossCounterComponent } from './take-control-loss-counter.component';

describe('TakeControlLossCounterComponent', () => {
  let component: TakeControlLossCounterComponent;
  let fixture: ComponentFixture<TakeControlLossCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeControlLossCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeControlLossCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
