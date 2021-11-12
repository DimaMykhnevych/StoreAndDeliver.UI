import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from 'src/app/core/enums/request-type';
import { convertToHttpParams } from 'src/app/core/http/request/http-params.util';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { Request } from 'src/app/core/models/request';
import { AppSettings } from 'src/app/core/settings';
import { AddRequest } from '../models/add-request';
import { OptimizedRequestsGroup } from '../models/optimized-requests';

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
    requestType: RequestType
  ): Observable<OptimizedRequestsGroup[]> {
    const httpParams: HttpParams =
      convertToHttpParams<RequestType>(requestType);
    return this._http.get<OptimizedRequestsGroup[]>(
      `${AppSettings.apiHost}/request/optimizedRequests`,
      {
        params: httpParams,
      }
    );
  }
}
