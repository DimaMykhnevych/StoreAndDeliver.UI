import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentSettingService {
  constructor(private _http: HttpClient) {}

  public getEnvironmentSettings(): Observable<EnvironmentSetting[]> {
    return this._http.get<EnvironmentSetting[]>(
      `${AppSettings.apiHost}/environmentSetting`
    );
  }
}
