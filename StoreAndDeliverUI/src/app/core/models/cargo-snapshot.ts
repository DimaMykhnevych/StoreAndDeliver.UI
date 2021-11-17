import { EnvironmentSetting } from './environment-setting';

export interface CargoSnapshot {
  id: string;
  cargoSessionId: string;
  environmentSettingId: string;
  value: number;
  environmentSetting: EnvironmentSetting;
}
