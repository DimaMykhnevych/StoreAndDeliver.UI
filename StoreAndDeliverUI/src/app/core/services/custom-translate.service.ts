import { Injectable } from '@angular/core';
import { HumidityUnit } from '../enums/humidity-unit';
import { LengthUnit } from '../enums/length-unit';
import { LuminosityUnit } from '../enums/luminosity-unit';
import { TemperatureUnit } from '../enums/temperature-unit';
import { UnitType } from '../enums/unit-type';
import { WeightUnit } from '../enums/weight-unit';
import { UnitTranslate } from '../models/unit-translate';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {
  private dictionary: UnitTranslate[] = [
    { en: 'Kilograms', ua: 'Кілограми', ru: 'Килограммы' },
    { en: 'Pounds', ua: 'Фунти', ru: 'Фунты' },
    { en: 'Meters', ua: 'Метри', ru: 'Метры' },
    { en: 'Yards', ua: 'Ярди', ru: 'Ярды' },
    { en: 'Celsius', ua: 'Цельсій', ru: 'Цельсий' },
    { en: 'Fahrenheit', ua: 'Фаренгейт', ru: 'Фаренгейт' },
    { en: 'Kelvin', ua: 'Кельвін', ru: 'Кельвин' },
    { en: 'Percentage', ua: 'Відсотки', ru: 'Проценты' },
    { en: 'Lux', ua: 'Люкс', ru: 'Люкс' },
    { en: 'Humidity', ua: 'Вологість', ru: 'Влажность' },
  ];

  private defaultUnitDictionary = {
    [UnitType.Length]: {
      en: LengthUnit.Yards,
      ua: LengthUnit.Meters,
      ru: LengthUnit.Meters,
    },
    [UnitType.Weight]: {
      en: WeightUnit.Pounds,
      ua: WeightUnit.Kilograms,
      ru: WeightUnit.Kilograms,
    },
    [UnitType.Temperature]: {
      en: TemperatureUnit.Fahrenheit,
      ua: TemperatureUnit.Celsius,
      ru: TemperatureUnit.Celsius,
    },
    [UnitType.Luminosity]: {
      en: LuminosityUnit.Lux,
      ua: LuminosityUnit.Lux,
      ru: LuminosityUnit.Lux,
    },
    [UnitType.Humidity]: {
      en: HumidityUnit.Percentage,
      ua: HumidityUnit.Percentage,
      ru: HumidityUnit.Percentage,
    },
  };

  constructor() {}

  public translateUnit(unitName: string): string {
    const currentLanguage = localStorage.getItem('language') || 'en';
    const neededObject = this.dictionary.find((item) => item.en === unitName);
    if (neededObject) {
      return neededObject[currentLanguage];
    }
    return '';
  }

  public getDefaultUnit(
    unitType: UnitType,
    language: string
  ): LengthUnit | WeightUnit | TemperatureUnit | HumidityUnit | LuminosityUnit {
    const neededUnit = this.defaultUnitDictionary[unitType];
    return neededUnit[language];
  }
}
