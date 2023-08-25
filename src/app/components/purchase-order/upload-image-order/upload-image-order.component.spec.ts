import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageOrderComponent } from './upload-image-order.component';

describe('UploadImageOrderComponent', () => {
  let component: UploadImageOrderComponent;
  let fixture: ComponentFixture<UploadImageOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
