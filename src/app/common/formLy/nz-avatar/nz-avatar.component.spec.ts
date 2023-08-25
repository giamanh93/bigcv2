import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzAvatarComponent } from './nz-avatar.component';

describe('NzAvatarComponent', () => {
  let component: NzAvatarComponent;
  let fixture: ComponentFixture<NzAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
