import { Injectable } from '@angular/core';
import { UserInfo } from '../../auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public userInfoChanged: Subject<UserInfo> = new Subject();

  private _userInfo: UserInfo;

  constructor() {
    this._userInfo = {};
  }

  public get userInfo(): UserInfo {
    return this._userInfo;
  }

  public set userInfo(info: UserInfo) {
    this._userInfo = info;
    this.userInfoChanged.next(this._userInfo);
  }

  public get isAdmin(): boolean {
    return this._userInfo.role === 'Admin';
  }
}
