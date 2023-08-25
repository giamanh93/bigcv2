import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWarningCounterComponent } from './group-warning-counter.component';

describe('GroupWarningCounterComponent', () => {
  let component: GroupWarningCounterComponent;
  let fixture: ComponentFixture<GroupWarningCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupWarningCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupWarningCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
