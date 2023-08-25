import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzCheckboxComponent } from './nz-checkbox.component';

describe('NzCheckboxComponent', () => {
  let component: NzCheckboxComponent;
  let fixture: ComponentFixture<NzCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
