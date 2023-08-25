import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzTimeComponent } from './nz-time.component';

describe('NzTimeComponent', () => {
  let component: NzTimeComponent;
  let fixture: ComponentFixture<NzTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
