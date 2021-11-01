import { CargoSetting } from 'src/app/core/models/cargo-setting';

export interface AddCargoWithSettings {
  id: string;
  description: string;
  amount: number;
  weight: number;
  length: number;
  width: number;
  height: number;

  settings?: CargoSetting[];
}
