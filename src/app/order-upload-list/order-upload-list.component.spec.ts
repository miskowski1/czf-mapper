import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadListComponent } from './order-upload-list.component';

describe('OrderUploadListComponent', () => {
  let component: OrderUploadListComponent;
  let fixture: ComponentFixture<OrderUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUploadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
