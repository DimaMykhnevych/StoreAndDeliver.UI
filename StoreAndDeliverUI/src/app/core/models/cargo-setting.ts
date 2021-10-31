import { Cargo } from './cargo';
import { EnvironmentSetting } from './environment-setting';

export interface CargoSetting {
  id: string;
  minValue: number;
  maxValue: number;
  cargoId: number;
  environmentSettingId: number;
  cargo: Cargo;
  environmentSetting: EnvironmentSetting;
}
