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
import { DialogService } from 'src/app/layout/dialogs/services/dialog.service';
import { AddCargoWithSettings } from '../../models/add-cargo-settings-model';
import { GetRecommendedSettings } from '../../models/get-recommended-settings';
import { CargoService } from '../../services/cargo.service';

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
  @Input() public set addCargoModel(r: AddCargoWithSettings) {
    this._initialCargo = r;
  }

  public get addCargoModel(): AddCargoWithSettings {
    return this._initialCargo;
  }

  public get environmentSettings(): EnvironmentSetting[] {
    return this._environmentSettings;
  }

  public get cargoSettings(): CargoSetting[] {
    return this._cargoSettings;
  }

  public isRecommendationsLoading: boolean = false;

  public _cargoSettings: CargoSetting[] = [];
  private _environmentSettings: EnvironmentSetting[] = [];
  private _initialCargo: AddCargoWithSettings = null as any;

  constructor(
    private _builder: FormBuilder,
    private _customTranslateService: CustomTranslateService,
    private _cargoService: CargoService,
    private _dialogService: DialogService
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

  public getMinSettingValue(setting: AbstractControl): number {
    if (this.isTemperatureSetting(setting)) {
      return -30;
    }
    return 0;
  }

  public getMaxSettingValue(setting: AbstractControl): number {
    if (this.isTemperatureSetting(setting)) {
      return 70;
    }
    return 100;
  }

  public onShowRecommendedSettingClick(): void {
    this.getCargoSettingRecommendations();
  }

  private getCargoSettingRecommendations(): void {
    const getSettingsParams: GetRecommendedSettings = {
      cargoDescription: this.addCargoModel.description,
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
    };
    this.isRecommendationsLoading = true;
    this._cargoService
      .getCargoSettingRecommendations(getSettingsParams)
      .subscribe((resp) => {
        this.isRecommendationsLoading = false;
        this._dialogService.openRecommendationDialog(resp);
      });
  }

  private isTemperatureSetting(setting: AbstractControl): boolean {
    const temperatureId = this.environmentSettings.find(
      (s) => s.name === 'Temperature'
    )?.id;
    if (setting.value?.environmentSettingId == temperatureId) {
      return true;
    }
    return false;
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
