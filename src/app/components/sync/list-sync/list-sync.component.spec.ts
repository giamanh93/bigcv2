import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSyncComponent } from './list-sync.component';

describe('ListSyncComponent', () => {
  let component: ListSyncComponent;
  let fixture: ComponentFixture<ListSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
