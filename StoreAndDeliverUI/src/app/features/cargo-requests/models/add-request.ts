import { Request } from 'src/app/core/models/request';
import { Units } from 'src/app/core/models/units';
import { AddCargoWithSettings } from './add-cargo-settings-model';

export interface AddRequest {
  request: Request;
  cargo: AddCargoWithSettings[];
  currentLanguage: string;
  units: Units;
}
