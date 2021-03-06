import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../../../core/settings';
import { RegistrationForm } from '../../../../core/auth';
import { AppUser } from 'src/app/core/models/app-user';
import { ChangeUserPassword } from '../../models/change-user-password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public create(user: RegistrationForm): Observable<any> {
    const headers = {
      language: localStorage.getItem('language') || 'en',
    };
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this._http.post<any>(
      `${AppSettings.apiHost}/user`,
      user,
      requestOptions
    );
  }

  public updatePassword(
    updatePasswordModel: ChangeUserPassword
  ): Observable<AppUser> {
    return this._http.put<AppUser>(
      `${AppSettings.apiHost}/user`,
      updatePasswordModel
    );
  }
}
