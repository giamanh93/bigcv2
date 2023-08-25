import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOrderComponent } from './input-order.component';

describe('InputOrderComponent', () => {
  let component: InputOrderComponent;
  let fixture: ComponentFixture<InputOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
