import { Request } from 'src/app/core/models/request';
import { AddCargoWithSettings } from './add-cargo-settings-model';

export interface AddRequest {
  request: Request;
  cargo: AddCargoWithSettings[];
  currentLanguage: string;
}
