import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrier } from 'src/app/core/models/carrier';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class CarrierService {
  constructor(private _http: HttpClient) {}

  public getCurrentLoggedInCarrier(): Observable<Carrier> {
    return this._http.get<Carrier>(
      `${AppSettings.apiHost}/carrier/getCurrentLoggedInCarrier`
    );
  }
}
