import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnProfitTableReportComponent } from './un-profit-table-report.component';

describe('UnProfitTableReportComponent', () => {
  let component: UnProfitTableReportComponent;
  let fixture: ComponentFixture<UnProfitTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnProfitTableReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnProfitTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
