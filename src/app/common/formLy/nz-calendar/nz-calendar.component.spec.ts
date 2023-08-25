import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzCalendarComponent } from './nz-calendar.component';

describe('NzCalendarComponent', () => {
  let component: NzCalendarComponent;
  let fixture: ComponentFixture<NzCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
