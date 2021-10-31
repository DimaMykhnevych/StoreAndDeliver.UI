import { Cargo } from './cargo';

export interface CargoRequest {
  id: string;
  cargoId: string;
  requestId: string;
  cargo: Cargo;
  request: Request;
}
