import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzPasswordComponent } from './nz-password.component';

describe('NzPasswordComponent', () => {
  let component: NzPasswordComponent;
  let fixture: ComponentFixture<NzPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
