import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoFormContainerComponent } from './cargo-form-container.component';

describe('CargoFormContainerComponent', () => {
  let component: CargoFormContainerComponent;
  let fixture: ComponentFixture<CargoFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
