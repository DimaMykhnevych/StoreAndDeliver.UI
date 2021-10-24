import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../../../core/settings';
import { RegistrationForm } from '../../../../core/auth';
// import { IConfirmEmailModel } from 'src/app/core/models/confirm-email';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public create(user: RegistrationForm): Observable<any> {
    return this._http.post<any>(`${AppSettings.apiHost}/user`, user);
  }

  // public confirmEmail(
  //   confirmModel: IConfirmEmailModel
  // ): Observable<IConfirmEmailModel> {
  //   return this._http.post<IConfirmEmailModel>(
  //     `${AppSettings.apiHost}/user/confirmEmail`,
  //     confirmModel
  //   );
  // }
}
