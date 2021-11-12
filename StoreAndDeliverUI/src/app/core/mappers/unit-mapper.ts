import { HumidityUnit } from '../enums/humidity-unit';
import { LengthUnit } from '../enums/length-unit';
import { LuminosityUnit } from '../enums/luminosity-unit';
import { TemperatureUnit } from '../enums/temperature-unit';
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

  private temperatureDictionary = {
    [TemperatureUnit.Celsius]:
      this._customTranslateService.translateUnit('Celsius'),
    [TemperatureUnit.Fahrenheit]:
      this._customTranslateService.translateUnit('Fahrenheit'),
    [TemperatureUnit.Kelvin]:
      this._customTranslateService.translateUnit('Kelvin'),
  };

  private humidityDictionary = {
    [HumidityUnit.Percentage]:
      this._customTranslateService.translateUnit('Percentage'),
  };

  private luminosityDictionary = {
    [LuminosityUnit.Lux]: this._customTranslateService.translateUnit('Lux'),
  };

  constructor(private _customTranslateService: CustomTranslateService) {}

  public convertUnitToString(unitType: UnitType, unit: any): string {
    switch (unitType) {
      case UnitType.Weight:
        return this.convertWeightUnitToString(unit);
      case UnitType.Length:
        return this.convertLengthUnitToString(unit);
      case UnitType.Temperature:
        return this.convertTemperatureUnitToString(unit);
      case UnitType.Humidity:
        return this.convertHumidityUnitToString(unit);
      case UnitType.Luminosity:
        return this.convertLuminosityUnitToString(unit);
      default:
        return '';
    }
  }

  public convertLuminosityUnitToString(unit: LuminosityUnit): string {
    return this.luminosityDictionary[unit];
  }

  public convertHumidityUnitToString(unit: HumidityUnit): string {
    return this.humidityDictionary[unit];
  }

  public convertTemperatureUnitToString(unit: TemperatureUnit): string {
    return this.temperatureDictionary[unit];
  }

  public convertWeightUnitToString(unit: WeightUnit): string {
    return this.weightDictionary[unit];
  }

  public convertLengthUnitToString(unit: LengthUnit): string {
    return this.lengthDictionary[unit];
  }
}
