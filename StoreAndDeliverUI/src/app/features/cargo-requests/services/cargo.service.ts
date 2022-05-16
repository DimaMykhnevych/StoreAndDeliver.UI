import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoRecommendedSetting } from '../models/cargo-recommended-setting';
import { AppSettings } from 'src/app/core/settings';
import { GetRecommendedSettings } from '../models/get-recommended-settings';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(private _http: HttpClient) {}

  public getCargoSettingRecommendations(
    recommendedSettings: GetRecommendedSettings
  ): Observable<CargoRecommendedSetting[]> {
    return this._http.post<CargoRecommendedSetting[]>(
      `${AppSettings.apiHost}/cargo/getCargoSettingRecommendations`,
      recommendedSettings
    );
  }
}
