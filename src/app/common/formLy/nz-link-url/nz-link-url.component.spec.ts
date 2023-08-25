import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzLinkUrlComponent } from './nz-link-url.component';

describe('NzLinkUrlComponent', () => {
  let component: NzLinkUrlComponent;
  let fixture: ComponentFixture<NzLinkUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzLinkUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzLinkUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
