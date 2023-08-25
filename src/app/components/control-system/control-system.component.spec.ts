import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSystemComponent } from './control-system.component';

describe('ControlSystemComponent', () => {
  let component: ControlSystemComponent;
  let fixture: ComponentFixture<ControlSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
