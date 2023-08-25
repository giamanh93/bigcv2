import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowOrderValueComponent } from './follow-order-value.component';

describe('FollowOrderValueComponent', () => {
  let component: FollowOrderValueComponent;
  let fixture: ComponentFixture<FollowOrderValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowOrderValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowOrderValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
