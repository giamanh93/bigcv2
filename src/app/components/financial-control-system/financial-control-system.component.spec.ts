import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialControlSystemComponent } from './financial-control-system.component';

describe('FinancialControlSystemComponent', () => {
  let component: FinancialControlSystemComponent;
  let fixture: ComponentFixture<FinancialControlSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialControlSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialControlSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
