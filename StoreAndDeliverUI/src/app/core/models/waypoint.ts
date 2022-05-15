import { MapPoint } from './map-point';

export interface Waypoint {
  location: MapPoint;
  stopover: boolean;
}
