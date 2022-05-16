import { EnvironmentSetting } from 'src/app/core/models/environment-setting';

export interface CargoRecommendedSetting {
  minValue: number;
  maxValue: number;
  environmentSetting: EnvironmentSetting;
}
