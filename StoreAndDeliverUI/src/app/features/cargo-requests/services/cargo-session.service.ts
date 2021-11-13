import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/settings';
import { GetOptimizedRequestModel } from '../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../models/optimized-requests';

@Injectable({
  providedIn: 'root',
})
export class CargoSessionService {
  constructor(private _http: HttpClient) {}

  public getCarrierRequests(
    getParams: GetOptimizedRequestModel
  ): Observable<OptimizedRequestsGroup> {
    return this._http.post<OptimizedRequestsGroup>(
      `${AppSettings.apiHost}/cargoSession/filteredCarrierRequests`,
      getParams
    );
  }
}
