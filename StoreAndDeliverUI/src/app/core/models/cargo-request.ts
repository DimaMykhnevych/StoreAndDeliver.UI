import { RequestStatus } from '../enums/request-status';
import { Cargo } from './cargo';
import { Request } from './request';
import { Store } from './store';

export interface CargoRequest {
  id: string;
  status: RequestStatus;
  cargoId: string;
  requestId: string;
  storeId?: string;
  cargo: Cargo;
  request: Request;
  store?: Store;
}
