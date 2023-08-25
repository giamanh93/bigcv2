import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzAutocompleteComponent } from './nz-autocomplete.component';

describe('NzAutocompleteComponent', () => {
  let component: NzAutocompleteComponent;
  let fixture: ComponentFixture<NzAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
