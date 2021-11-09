import { RequestStatus } from '../enums/request-status';
import { RequestType } from '../enums/request-type';
import { Address } from './address';

export interface Request {
  id?: string;
  requestDate?: Date;
  carryOutBefore?: Date;
  storeFromDate?: Date;
  storeUntilDate?: Date;
  type?: RequestType;
  status?: RequestStatus;
  isSecurityModeEnabled?: boolean;
  totalSum?: number;
  fromAddress?: Address;
  toAddress?: Address;
}
