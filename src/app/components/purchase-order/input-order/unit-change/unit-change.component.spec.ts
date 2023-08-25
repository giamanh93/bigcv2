import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitChangeComponent } from './unit-change.component';

describe('UnitChangeComponent', () => {
  let component: UnitChangeComponent;
  let fixture: ComponentFixture<UnitChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
