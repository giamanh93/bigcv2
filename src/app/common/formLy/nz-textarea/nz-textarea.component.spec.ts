import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzTextareaComponent } from './nz-textarea.component';

describe('NzTextareaComponent', () => {
  let component: NzTextareaComponent;
  let fixture: ComponentFixture<NzTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
