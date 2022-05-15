import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrier } from 'src/app/core/models/carrier';
import { CarrierStatistics } from 'src/app/core/models/carrier-statistics';
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

  public getCarriersStatistics(): Observable<CarrierStatistics[]> {
    return this._http.get<CarrierStatistics[]>(
      `${AppSettings.apiHost}/carrier/getCarrierStatistics`
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
