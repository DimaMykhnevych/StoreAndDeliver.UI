import { Cargo } from 'src/app/core/models/cargo';
import { CargoSetting } from 'src/app/core/models/cargo-setting';

export interface CargoAddModel {
  cargo?: Cargo[];
  // settings?: CargoSetting[];
}
