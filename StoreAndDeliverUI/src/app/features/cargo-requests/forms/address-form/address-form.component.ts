import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  public form: FormGroup = this._builder.group({});

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl(1, Validators.required),
    });
  }

  get country() {
    return this.form.get('country');
  }
  get city() {
    return this.form.get('city');
  }
  get street() {
    return this.form.get('street');
  }
  get number() {
    return this.form.get('number');
  }
}
