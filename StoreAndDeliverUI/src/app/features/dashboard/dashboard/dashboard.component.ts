import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppUser } from 'src/app/core/models/app-user';
import { Roles } from 'src/app/core/models/roles';
import { CurrentUserService } from 'src/app/core/permission/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public currentUser!: AppUser;
  public isAdmin: boolean = true;
  public isCarrier: boolean = true;
  public isUser: boolean = true;
  public isCompanyAdmin: boolean = true;

  constructor(
    private _currentUserService: CurrentUserService,
    private _translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.initUserInfo();
  }

  public getGreeting(): string {
    const todayDate: Date = new Date();
    const hours = todayDate.getHours();
    switch (true) {
      case hours < 12:
        return this._translateService.instant('common.goodMorning');
      case hours >= 12 && hours < 16:
        return this._translateService.instant('common.goodAfternoon');
      case hours >= 16:
        return this._translateService.instant('common.goodEvening');
      default:
        return this._translateService.instant('common.goodAfternoon');
    }
  }

  private initUserInfo(): void {
    this.currentUser = this._currentUserService.userInfo;
    this.isAdmin = this.currentUser.role === Roles.Admin;
    this.isCarrier = this.currentUser.role === Roles.Carrier;
    this.isUser = this.currentUser.role === Roles.User;
    this.isCompanyAdmin = this.currentUser.role === Roles.CompanyAdmin;
  }
}
