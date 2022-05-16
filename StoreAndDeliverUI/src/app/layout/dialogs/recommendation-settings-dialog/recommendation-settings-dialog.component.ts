import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';
import { Units } from 'src/app/core/models/units';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { CargoRecommendedSetting } from 'src/app/features/cargo-requests/models/cargo-recommended-setting';

@Component({
  selector: 'app-recommendation-settings-dialog',
  templateUrl: './recommendation-settings-dialog.component.html',
  styleUrls: ['./recommendation-settings-dialog.component.scss'],
})
export class RecommendationSettingsDialogComponent implements OnInit {
  public settings: CargoRecommendedSetting[];
  constructor(
    @Inject(MAT_DIALOG_DATA) data: CargoRecommendedSetting[],
    private _customTranslateService: CustomTranslateService
  ) {
    this.settings = data;
  }

  public ngOnInit(): void {}

  public getTranslatedSetting(settingName: string): string {
    return this._customTranslateService.translateUnit(settingName);
  }

  public getDisplayedUnitSymbol(setting: CargoRecommendedSetting): string {
    const units: Units = JSON.parse(
      localStorage.getItem('units') || JSON.stringify({})
    );
    switch (setting.environmentSetting.name) {
      case 'Temperature':
        return units.temperature === TemperatureUnit.Celsius
          ? '°C'
          : units.temperature === TemperatureUnit.Fahrenheit
          ? '°F'
          : 'K';
      case 'Humidity':
        return '%';
      case 'Luminosity':
        return this._customTranslateService.translateUnit('Lux');
      default:
        return '';
    }
  }
}
