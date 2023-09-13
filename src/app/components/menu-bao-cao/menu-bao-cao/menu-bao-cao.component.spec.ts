import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBaoCaoComponent } from './menu-bao-cao.component';

describe('MenuBaoCaoComponent', () => {
  let component: MenuBaoCaoComponent;
  let fixture: ComponentFixture<MenuBaoCaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBaoCaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBaoCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
