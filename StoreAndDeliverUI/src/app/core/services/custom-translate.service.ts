import { Injectable } from '@angular/core';
import { LengthUnit } from '../enums/length-unit';
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
  ): LengthUnit | WeightUnit {
    const neededUnit = this.defaultUnitDictionary[unitType];
    return neededUnit[language];
  }
}
