import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss'],
})
export class CargoFormComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  private _formArray = [this.getFormArrayElement()];

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onAddCargoClick() {
    this.cargo.push(this.getFormArrayElement());
  }

  public onDeleteCargoClick(index: number): void {
    this.cargo.removeAt(index);
  }

  public getCurrentFormControl(
    index: number,
    controlName: string
  ): AbstractControl | null {
    return this.cargo.controls[index].get(controlName);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      cargo: this._builder.array(this._formArray),
    });
  }

  private getFormArrayElement(): FormGroup {
    return this._builder.group({
      weight: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  get cargo() {
    return this.form.get('cargo') as FormArray;
  }
}
