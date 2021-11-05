import { HumidityUnit } from '../enums/humidity-unit';
import { LengthUnit } from '../enums/length-unit';
import { LuminosityUnit } from '../enums/luminosity-unit';
import { TemperatureUnit } from '../enums/temperature-unit';
import { WeightUnit } from '../enums/weight-unit';

export interface Units {
  weight: WeightUnit;
  length: LengthUnit;
  temperature: TemperatureUnit;
  humidity: HumidityUnit;
  luminosity: LuminosityUnit;
}
