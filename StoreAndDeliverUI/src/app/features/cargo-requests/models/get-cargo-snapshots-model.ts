import { HumidityUnit } from 'src/app/core/enums/humidity-unit';
import { LuminosityUnit } from 'src/app/core/enums/luminosity-unit';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';

export interface GetCargoSnapshots {
  id: string;
  cargoRequestId: string;
  temperature: TemperatureUnit;
  humidity: HumidityUnit;
  luminosity: LuminosityUnit;
}
