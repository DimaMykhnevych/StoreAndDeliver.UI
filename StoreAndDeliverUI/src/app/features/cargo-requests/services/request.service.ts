import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/settings';
import { AddRequest } from '../models/add-request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private _http: HttpClient) {}

  public getRequestTotalSum(request: AddRequest): Observable<number> {
    return this._http.post<number>(
      `${AppSettings.apiHost}/request/price`,
      request
    );
  }
}
