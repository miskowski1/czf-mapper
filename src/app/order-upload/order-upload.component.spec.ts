import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadComponent } from './order-upload.component';

describe('OrderUploadComponent', () => {
  let component: OrderUploadComponent;
  let fixture: ComponentFixture<OrderUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
