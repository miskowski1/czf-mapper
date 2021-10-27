import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeFileComponent } from './include-file.component';

describe('IncludeFileComponent', () => {
  let component: IncludeFileComponent;
  let fixture: ComponentFixture<IncludeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludeFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
