import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-request-type-form',
  templateUrl: './request-type-form.component.html',
  styleUrls: ['./request-type-form.component.scss'],
})
export class RequestTypeFormComponent implements OnInit {
  public form: FormGroup = this._builder.group({});

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      requestType: new FormControl('', [Validators.required]),
    });
  }

  get requestType() {
    return this.form.get('requestType');
  }
}
