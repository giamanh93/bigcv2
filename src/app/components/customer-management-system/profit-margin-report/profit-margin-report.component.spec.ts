import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitMarginReportComponent } from './profit-margin-report.component';

describe('ProfitMarginReportComponent', () => {
  let component: ProfitMarginReportComponent;
  let fixture: ComponentFixture<ProfitMarginReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitMarginReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitMarginReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
