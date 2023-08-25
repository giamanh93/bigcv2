import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowFormShoppingComponent } from './follow-form-shopping.component';

describe('FollowFormShoppingComponent', () => {
  let component: FollowFormShoppingComponent;
  let fixture: ComponentFixture<FollowFormShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowFormShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowFormShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
