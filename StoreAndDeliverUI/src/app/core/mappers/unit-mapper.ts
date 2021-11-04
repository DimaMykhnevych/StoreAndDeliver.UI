import { LengthUnit } from '../enums/length-unit';
import { UnitType } from '../enums/unit-type';
import { WeightUnit } from '../enums/weight-unit';
import { CustomTranslateService } from '../services/custom-translate.service';

export class UnitMapper {
  private weightDictionary = {
    [WeightUnit.Kilograms]:
      this._customTranslateService.translateUnit('Kilograms'),
    [WeightUnit.Pounds]: this._customTranslateService.translateUnit('Pounds'),
  };

  private lengthDictionary = {
    [LengthUnit.Meters]: this._customTranslateService.translateUnit('Meters'),
    [LengthUnit.Yards]: this._customTranslateService.translateUnit('Yards'),
  };

  constructor(private _customTranslateService: CustomTranslateService) {}

  public convertUnitToString(unitType: UnitType, unit: any): string {
    switch (unitType) {
      case UnitType.Weight:
        return this.convertWeightUnitToString(unit);
      case UnitType.Length:
        return this.convertLengthUnitToString(unit);
    }
  }

  public convertWeightUnitToString(unit: WeightUnit): string {
    return this.weightDictionary[unit];
  }

  public convertLengthUnitToString(unit: LengthUnit): string {
    return this.lengthDictionary[unit];
  }
}
