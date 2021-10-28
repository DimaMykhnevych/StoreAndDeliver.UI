import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsFormComponent } from './request-details-form.component';

describe('RequestDetailsFormComponent', () => {
  let component: RequestDetailsFormComponent;
  let fixture: ComponentFixture<RequestDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
