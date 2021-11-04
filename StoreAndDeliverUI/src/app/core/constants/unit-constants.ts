import { LengthUnit } from '../enums/length-unit';
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
}
