import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShipComponent } from './order-ship.component';

describe('OrderShipComponent', () => {
  let component: OrderShipComponent;
  let fixture: ComponentFixture<OrderShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
