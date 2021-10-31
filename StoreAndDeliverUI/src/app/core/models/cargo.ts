import { CargoSetting } from './cargo-setting';

export interface Cargo {
  id: string;
  description: string;
  amount: number;
  weight: number;
  length: number;
  width: number;
  height: number;

  settings: CargoSetting[];
}
