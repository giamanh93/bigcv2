import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyWarningSystemComponent } from './early-warning-system.component';

describe('EarlyWarningSystemComponent', () => {
  let component: EarlyWarningSystemComponent;
  let fixture: ComponentFixture<EarlyWarningSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyWarningSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarlyWarningSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
