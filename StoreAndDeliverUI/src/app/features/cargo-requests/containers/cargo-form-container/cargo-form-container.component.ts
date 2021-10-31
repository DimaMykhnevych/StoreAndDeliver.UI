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
  public requestTypeForm: CargoFormComponent = null as any;
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
    this._cargo.cargo = this.requestTypeForm.form.value?.cargo;
  }
}
