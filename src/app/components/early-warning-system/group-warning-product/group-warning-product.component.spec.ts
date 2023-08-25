import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWarningProductComponent } from './group-warning-product.component';

describe('GroupWarningProductComponent', () => {
  let component: GroupWarningProductComponent;
  let fixture: ComponentFixture<GroupWarningProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupWarningProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupWarningProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
