import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoRequestsComponent } from './cargo-requests.component';

describe('CargoRequestsComponent', () => {
  let component: CargoRequestsComponent;
  let fixture: ComponentFixture<CargoRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
