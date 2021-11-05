import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableUnits } from 'src/app/core/constants/unit-constants';
import { HumidityUnit } from 'src/app/core/enums/humidity-unit';
import { LuminosityUnit } from 'src/app/core/enums/luminosity-unit';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';
import { UnitType } from 'src/app/core/enums/unit-type';
import { CargoSetting } from 'src/app/core/models/cargo-setting';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { CargoAddModel } from '../../models/cargo-add-model';
import { IndicatorItemFormComponent } from '../indicator-item-form/indicator-item-form.component';

@Component({
  selector: 'app-indicators-setup-form',
  templateUrl: './indicators-setup-form.component.html',
  styleUrls: ['./indicators-setup-form.component.scss'],
})
export class IndicatorsSetupFormComponent implements OnInit, OnDestroy {
  @ViewChild('indicatorItemForm')
  public indicatorItemForm: IndicatorItemFormComponent = null as any;

  public availableTemperatureUnits: TemperatureUnit[] =
    AvailableUnits.availableTemperatureUnits;
  public availableHumidityUnitTypes: HumidityUnit[] =
    AvailableUnits.availableHumidityUnits;
  public availableLuminosityUnits: LuminosityUnit[] =
    AvailableUnits.availableLuminosityUnits;

  public temperatureUnitType = UnitType.Temperature;
  public luminosityUnitType = UnitType.Luminosity;
  public humidityUnitType = UnitType.Humidity;

  public defaultTemperatureUnit: number = 0;
  public defaultHumidityUnit: number = 0;
  public defaultLuminosityUnit: number = 0;

  public temperatureHeader: string = '';
  public luminosityHeader: string = '';
  public humidityHeader: string = '';

  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  @Input() public set initialCargo(r: CargoAddModel) {
    this._cargo = r;
    this.subscribeOnFormValueChanges();
  }
  public get initialCargo(): CargoAddModel {
    return this._cargo;
  }
  @Input() public set environmentSettings(settings: EnvironmentSetting[]) {
    this._environmentSettings = settings;
  }
  public get environmentSettings(): EnvironmentSetting[] {
    return this._environmentSettings;
  }
  private _environmentSettings: EnvironmentSetting[] = [];
  private _cargo: CargoAddModel = null as any;
  private _destroy$: Subject<void> = new Subject<void>();
  public formArray = new FormArray([]);
  public selectedIndex = 0;

  constructor(
    private _translateService: TranslateService,
    private _customTranslateService: CustomTranslateService
  ) {}

  public ngOnInit(): void {
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp) => {
        this.getUnitTypeHeader();
        this.getDefaultUnit(resp.lang);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onIndicatorSettingValueChanges(): void {
    this._cargo.cargo[this.selectedIndex].settings =
      this.indicatorItemForm.form.value?.settings;
  }

  public onCargoItemClick(selectedCargoIndex: number): void {
    this.selectedIndex = selectedCargoIndex;
  }

  public getDefaultUnit(language: string): void {
    this.defaultTemperatureUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Temperature,
      language
    );
    this.defaultHumidityUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Humidity,
      language
    );
    this.defaultLuminosityUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Luminosity,
      language
    );
  }

  public getUnitTypeHeader(): void {
    this._translateService.get('common.luminosityUnit').subscribe((resp) => {
      this.luminosityHeader = resp;
    });
    this._translateService.get('common.temperatureUnit').subscribe((resp) => {
      this.temperatureHeader = resp;
    });
    this._translateService.get('common.humidityUnit').subscribe((resp) => {
      this.humidityHeader = resp;
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.formArray.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.valueChanges.emit();
      });
  }
}
