import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CargoSetting } from 'src/app/core/models/cargo-setting';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-indicator-item-form',
  templateUrl: './indicator-item-form.component.html',
  styleUrls: ['./indicator-item-form.component.scss'],
})
export class IndicatorItemFormComponent implements OnInit {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = this._builder.group({});
  private _formArray = [this.getFormArrayElement()];
  @Input() public set cargoSettings(r: CargoSetting[]) {
    this._cargoSettings = r;
    this.initializeForm(r);
  }
  @Input() public set environmentSettings(settings: EnvironmentSetting[]) {
    this._environmentSettings = settings;
  }

  public get environmentSettings(): EnvironmentSetting[] {
    return this._environmentSettings;
  }

  public get cargoSettings(): CargoSetting[] {
    return this._cargoSettings;
  }

  public _cargoSettings: CargoSetting[] = [];
  private _environmentSettings: EnvironmentSetting[] = [];

  constructor(
    private _builder: FormBuilder,
    private _customTranslateService: CustomTranslateService
  ) {}

  public ngOnInit(): void {}

  public getCurrentFormControl(
    index: number,
    controlName: string
  ): AbstractControl | null {
    return this.settings.controls[index].get(controlName);
  }

  public onAddSettingClick(): void {
    if (this._environmentSettings.length === this.settings.length) return;
    this.settings.push(this.getFormArrayElement());
  }

  public onFocusOut(): void {
    if (this.form.valid) {
      this.valueChanges.emit();
    }
  }

  public onSelectionChange(): void {
    if (this.form.valid) {
      this.valueChanges.emit();
    }
  }

  public onDeleteSettingClick(idx: number): void {
    this.settings.removeAt(idx);
    this.valueChanges.emit();
  }

  public translateSetting(setting: string): string {
    return this._customTranslateService.translateUnit(setting);
  }

  private initializeForm(settings: CargoSetting[]): void {
    if (settings && settings.length) {
      this._formArray = [];
      settings.forEach((c) => {
        this._formArray.push(this.getFormArrayElement(c));
      });
    } else {
      this._formArray = [this.getFormArrayElement()];
    }
    this.form = this._builder.group({
      settings: this._builder.array(this._formArray),
    });
  }

  private getFormArrayElement(data?: CargoSetting): FormGroup {
    return this._builder.group({
      minValue: new FormControl(data?.minValue, [Validators.required]),
      maxValue: new FormControl(data?.maxValue, [Validators.required]),
      environmentSettingId: new FormControl(data?.environmentSettingId, [
        Validators.required,
      ]),
    });
  }

  get settings() {
    return this.form.get('settings') as FormArray;
  }
}
