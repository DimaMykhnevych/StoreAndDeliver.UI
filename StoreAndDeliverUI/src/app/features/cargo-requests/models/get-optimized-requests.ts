import { RequestType } from 'src/app/core/enums/request-type';
import { Units } from 'src/app/core/models/units';

export interface GetOptimizedRequestModel {
  requestType: RequestType;
  units: Units;
  currentLanguage: string;
}
