import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-request-details-form',
  templateUrl: './request-details-form.component.html',
  styleUrls: ['./request-details-form.component.scss'],
})
export class RequestDetailsFormComponent implements OnInit {
  public form: FormGroup = this._builder.group({});

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      carryOutBefore: new FormControl('', [Validators.required]),
      storeFromDate: new FormControl('', [Validators.required]),
      storeUntilDate: new FormControl('', [Validators.required]),
    });
  }

  get carryOutBefore() {
    return this.form.get('carryOutBefore');
  }

  get storeFromDate() {
    return this.form.get('storeFromDate');
  }

  get storeUntilDate() {
    return this.form.get('storeUntilDate');
  }
}
