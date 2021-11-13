import { Units } from 'src/app/core/models/units';
import { OptimizedRequestsGroup } from './optimized-requests';

export interface UpdateCargoRequests {
  requestGroup: OptimizedRequestsGroup;
  units: Units;
}
