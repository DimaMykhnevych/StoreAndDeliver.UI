import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableUnits } from 'src/app/core/constants/unit-constants';
import { HumidityUnit } from 'src/app/core/enums/humidity-unit';
import { LuminosityUnit } from 'src/app/core/enums/luminosity-unit';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';
import { UnitType } from 'src/app/core/enums/unit-type';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-units-panel',
  templateUrl: './units-panel.component.html',
  styleUrls: ['./units-panel.component.scss'],
})
export class UnitsPanelComponent implements OnInit {
  @Output() public onUnitSelectionChanged: EventEmitter<void> =
    new EventEmitter<void>();
  public availableWeightUnits = AvailableUnits.availableWeightUnits;
  public availableLengthUnits = AvailableUnits.availableLengthUnits;
  public weightUnitType = UnitType.Weight;
  public lengthUnitType = UnitType.Length;
  public weightHeader = '';
  public lengthHeader = '';
  public defaultWeightUnit: number = 0;
  public defaultLengthUnit: number = 0;
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
  private _destroy$: Subject<void> = new Subject<void>();

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

  public getUnitTypeHeader(): void {
    this._translateService.get('common.weightUnit').subscribe((resp) => {
      this.weightHeader = resp;
    });
    this._translateService.get('common.lengthUnit').subscribe((resp) => {
      this.lengthHeader = resp;
    });
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

  public onSelectionCahnged(): void {
    this.onUnitSelectionChanged.emit();
  }

  public getDefaultUnit(language: string): void {
    this.defaultLengthUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Length,
      language
    );
    this.defaultWeightUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Weight,
      language
    );
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
}
