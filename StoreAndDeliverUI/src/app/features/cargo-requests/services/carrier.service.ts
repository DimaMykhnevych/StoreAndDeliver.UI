import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrier } from 'src/app/core/models/carrier';
import { AppSettings } from 'src/app/core/settings';
import { AddCarrier } from '../../admin-features/models/add-carrier';
import { UpdateCarrier } from '../../admin-features/models/update-carrier';

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

  public getCarriers(): Observable<Carrier[]> {
    return this._http.get<Carrier[]>(`${AppSettings.apiHost}/carrier`);
  }

  public addCarrier(carrier: AddCarrier): Observable<Carrier> {
    return this._http.post<Carrier>(`${AppSettings.apiHost}/carrier`, carrier);
  }

  public updateCarrier(carrier: UpdateCarrier): Observable<boolean> {
    return this._http.put<boolean>(`${AppSettings.apiHost}/carrier`, carrier);
  }

  public deleteCarrier(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${AppSettings.apiHost}/carrier/${id}`);
  }
}
