import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/core/models/request';
import { AppSettings } from 'src/app/core/settings';
import { AddRequest } from '../models/add-request';

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
}
