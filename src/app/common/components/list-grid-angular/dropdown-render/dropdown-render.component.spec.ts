import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRenderComponent } from './dropdown-render.component';

describe('DropdownRenderComponent', () => {
  let component: DropdownRenderComponent;
  let fixture: ComponentFixture<DropdownRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
