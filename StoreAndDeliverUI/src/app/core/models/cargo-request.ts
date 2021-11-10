import { RequestStatus } from '../enums/request-status';
import { Cargo } from './cargo';

export interface CargoRequest {
  id: string;
  status: RequestStatus;
  cargoId: string;
  requestId: string;
  cargo: Cargo;
  request: Request;
}
