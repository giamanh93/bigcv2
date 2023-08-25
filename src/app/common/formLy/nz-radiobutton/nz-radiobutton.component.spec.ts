import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzRadiobuttonComponent } from './nz-radiobutton.component';

describe('NzRadiobuttonComponent', () => {
  let component: NzRadiobuttonComponent;
  let fixture: ComponentFixture<NzRadiobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzRadiobuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
