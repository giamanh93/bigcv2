import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzInputComponent } from './nz-input.component';

describe('NzInputComponent', () => {
  let component: NzInputComponent;
  let fixture: ComponentFixture<NzInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
