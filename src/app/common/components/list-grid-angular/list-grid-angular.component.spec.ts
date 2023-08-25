import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGridAngularComponent } from './list-grid-angular.component';

describe('ListGridAngularComponent', () => {
  let component: ListGridAngularComponent;
  let fixture: ComponentFixture<ListGridAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGridAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGridAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
