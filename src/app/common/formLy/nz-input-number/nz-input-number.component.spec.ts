import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzInputNumberComponent } from './nz-input-number.component';

describe('NzInputNumberComponent', () => {
  let component: NzInputNumberComponent;
  let fixture: ComponentFixture<NzInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
