import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsFormContainerComponent } from './request-details-form-container.component';

describe('RequestDetailsFormContainerComponent', () => {
  let component: RequestDetailsFormContainerComponent;
  let fixture: ComponentFixture<RequestDetailsFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailsFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailsFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
