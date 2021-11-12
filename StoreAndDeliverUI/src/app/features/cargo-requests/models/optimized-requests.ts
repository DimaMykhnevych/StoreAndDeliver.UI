import { CargoRequest } from 'src/app/core/models/cargo-request';

export interface OptimizedRequestsGroup {
  [requestId: string]: CargoRequest[];
}
