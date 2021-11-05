import { HumidityUnit } from '../enums/humidity-unit';
import { LengthUnit } from '../enums/length-unit';
import { LuminosityUnit } from '../enums/luminosity-unit';
import { TemperatureUnit } from '../enums/temperature-unit';
import { WeightUnit } from '../enums/weight-unit';

export class AvailableUnits {
  public static availableWeightUnits: WeightUnit[] = [
    WeightUnit.Kilograms,
    WeightUnit.Pounds,
  ];

  public static availableLengthUnits: LengthUnit[] = [
    LengthUnit.Meters,
    LengthUnit.Yards,
  ];

  public static availableTemperatureUnits: TemperatureUnit[] = [
    TemperatureUnit.Celsius,
    TemperatureUnit.Fahrenheit,
    TemperatureUnit.Kelvin,
  ];

  public static availableLuminosityUnits: LuminosityUnit[] = [
    LuminosityUnit.Lux,
  ];

  public static availableHumidityUnits: HumidityUnit[] = [
    HumidityUnit.Percentage,
  ];
}
