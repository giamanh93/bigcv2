import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWarningSupplierComponent } from './group-warning-supplier.component';

describe('GroupWarningSupplierComponent', () => {
  let component: GroupWarningSupplierComponent;
  let fixture: ComponentFixture<GroupWarningSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupWarningSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupWarningSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
