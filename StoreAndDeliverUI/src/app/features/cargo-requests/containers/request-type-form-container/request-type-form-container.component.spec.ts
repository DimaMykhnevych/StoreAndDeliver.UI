import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeFormContainerComponent } from './request-type-form-container.component';

describe('RequestTypeFormContainerComponent', () => {
  let component: RequestTypeFormContainerComponent;
  let fixture: ComponentFixture<RequestTypeFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTypeFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
