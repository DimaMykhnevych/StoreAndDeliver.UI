import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToHttpParams } from 'src/app/core/http/request/http-params.util';
import { City } from 'src/app/core/models/city';
import { AppSettings } from 'src/app/core/settings';
import { SearchCity } from '../models/search-city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private _http: HttpClient) {}

  public getCities(searchParams: SearchCity): Observable<City[]> {
    const httpParams: HttpParams =
      convertToHttpParams<SearchCity>(searchParams);
    return this._http.get<City[]>(`${AppSettings.apiHost}/city`, {
      params: httpParams,
    });
  }
}
