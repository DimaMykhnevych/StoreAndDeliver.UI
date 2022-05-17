import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HumidityUnit } from './core/enums/humidity-unit';
import { LengthUnit } from './core/enums/length-unit';
import { LuminosityUnit } from './core/enums/luminosity-unit';
import { TemperatureUnit } from './core/enums/temperature-unit';
import { WeightUnit } from './core/enums/weight-unit';
import { Units } from './core/models/units';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'StoreAndDeliverUI';

  constructor(private _translate: TranslateService) {}

  ngOnInit() {
    let lang = localStorage.getItem('language') || 'en';
    this._translate.setDefaultLang(lang);
    this._translate.use(lang);
    this.setUnits();
  }

  private setUnits(): void {
    const rawUnits = localStorage.getItem('units');
    if (!rawUnits) {
      const defaultUnits: Units = {
        weight: WeightUnit.Kilograms,
        length: LengthUnit.Meters,
        temperature: TemperatureUnit.Celsius,
        humidity: HumidityUnit.Percentage,
        luminosity: LuminosityUnit.Lux,
      };
      localStorage.setItem('units', JSON.stringify(defaultUnits));
    }
  }
}
