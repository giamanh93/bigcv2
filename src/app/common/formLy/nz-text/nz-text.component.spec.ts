import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzTextComponent } from './nz-text.component';

describe('NzTextComponent', () => {
  let component: NzTextComponent;
  let fixture: ComponentFixture<NzTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
