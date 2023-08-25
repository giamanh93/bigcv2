import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzMultiselectComponent } from './nz-multiselect.component';

describe('NzMultiselectComponent', () => {
  let component: NzMultiselectComponent;
  let fixture: ComponentFixture<NzMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzMultiselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
