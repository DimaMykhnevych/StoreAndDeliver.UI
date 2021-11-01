import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CargoFormComponent } from '../../forms/cargo-form/cargo-form.component';
import { CargoAddModel } from '../../models/cargo-add-model';

@Component({
  selector: 'app-cargo-form-container',
  templateUrl: './cargo-form-container.component.html',
  styleUrls: ['./cargo-form-container.component.scss'],
})
export class CargoFormContainerComponent implements OnInit {
  @ViewChild('cargoForm')
  public cargoForm: CargoFormComponent = null as any;
  @Input() public set cargo(r: CargoAddModel) {
    this._cargo = r;
  }
  public get cargo(): CargoAddModel {
    return this._cargo;
  }
  public _cargo: CargoAddModel = null as any;
  constructor() {}

  public ngOnInit(): void {}

  public onValueChanges(): void {
    const currentCargoCopy = this._cargo.cargo;
    this._cargo.cargo = this.cargoForm.form.value?.cargo;
    for (let i = 0; i < currentCargoCopy.length; i++) {
      this._cargo.cargo[i].settings = currentCargoCopy[i].settings;
    }
  }

  public isFormValid(): boolean {
    return this.cargoForm?.form?.valid;
  }
}
