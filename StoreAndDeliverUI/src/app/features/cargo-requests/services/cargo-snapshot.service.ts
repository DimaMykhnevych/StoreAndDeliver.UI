import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToHttpParams } from 'src/app/core/http/request/http-params.util';
import { CargoSnapshot } from 'src/app/core/models/cargo-snapshot';
import { AppSettings } from 'src/app/core/settings';
import { GetCargoSnapshots } from '../models/get-cargo-snapshots-model';

@Injectable({
  providedIn: 'root',
})
export class CargoSnapshotService {
  constructor(private _http: HttpClient) {}

  public getCargoSnapshotsByCargoRequestId(
    getParams: GetCargoSnapshots
  ): Observable<CargoSnapshot[]> {
    const httpParams: HttpParams =
      convertToHttpParams<GetCargoSnapshots>(getParams);
    return this._http.get<CargoSnapshot[]>(
      `${AppSettings.apiHost}/CargoSnapshot/getSnapshotsByCargoRequestId`,
      {
        params: httpParams,
      }
    );
  }
}
