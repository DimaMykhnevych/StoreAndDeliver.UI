import { City } from './city';

export interface OptimalStoreLocation {
  startLatitude: number;
  endLatitude: number;
  startLongtitude: number;
  endLongtitude: number;
  cities: City[];
}
