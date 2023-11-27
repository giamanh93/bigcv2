import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageRateExceedsNormComponent } from './damage-rate-exceeds-norm.component';

describe('DamageRateExceedsNormComponent', () => {
  let component: DamageRateExceedsNormComponent;
  let fixture: ComponentFixture<DamageRateExceedsNormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageRateExceedsNormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageRateExceedsNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
