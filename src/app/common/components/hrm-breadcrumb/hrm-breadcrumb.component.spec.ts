import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HrmBreadCrumbComponent } from './hrm-breadcrumb.component';

describe('HrmBreadCrumbComponent', () => {
  let component: HrmBreadCrumbComponent;
  let fixture: ComponentFixture<HrmBreadCrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmBreadCrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
