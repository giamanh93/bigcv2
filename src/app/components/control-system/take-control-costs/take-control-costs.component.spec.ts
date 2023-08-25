import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeControlCostsComponent } from './take-control-costs.component';

describe('TakeControlCostsComponent', () => {
  let component: TakeControlCostsComponent;
  let fixture: ComponentFixture<TakeControlCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeControlCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeControlCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
