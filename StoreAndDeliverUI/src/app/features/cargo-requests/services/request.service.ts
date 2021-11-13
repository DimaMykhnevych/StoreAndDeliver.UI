import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/core/models/request';
import { AppSettings } from 'src/app/core/settings';
import { AddRequest } from '../models/add-request';
import { GetOptimizedRequestModel } from '../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../models/optimized-requests';
import { UpdateCargoRequests } from '../models/update-cargo-reauests';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private _http: HttpClient) {}

  public addRequest(request: AddRequest): Observable<Request> {
    return this._http.post<Request>(`${AppSettings.apiHost}/request/`, request);
  }

  public getRequestTotalSum(request: AddRequest): Observable<number> {
    return this._http.post<number>(
      `${AppSettings.apiHost}/request/price`,
      request
    );
  }

  public getOptimizedRequests(
    getModel: GetOptimizedRequestModel
  ): Observable<OptimizedRequestsGroup[]> {
    return this._http.post<OptimizedRequestsGroup[]>(
      `${AppSettings.apiHost}/request/optimizedRequests`,
      getModel
    );
  }

  public updateRequestStatuses(
    requestGroup: UpdateCargoRequests
  ): Observable<boolean> {
    return this._http.put<boolean>(
      `${AppSettings.apiHost}/request/updateRequestStautses`,
      requestGroup
    );
  }
}
