import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDropdownComponent } from './nz-dropdown.component';

describe('NzDropdownComponent', () => {
  let component: NzDropdownComponent;
  let fixture: ComponentFixture<NzDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
