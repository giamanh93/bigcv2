import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzTreeSelectComponent } from './nz-tree-select.component';

describe('NzTreeSelectComponent', () => {
  let component: NzTreeSelectComponent;
  let fixture: ComponentFixture<NzTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzTreeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
