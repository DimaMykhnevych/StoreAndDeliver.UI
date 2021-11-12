import { Address } from './address';
import { CargoRequest } from './cargo-request';

export interface Store {
  id: string;
  name: string;
  maxCargoVolume: number;
  currentOccupiedVolume: number;
  addressId: string;
  address: Address;
  cargoRequests: CargoRequest[];
}
