import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, UserInfo } from 'src/app/core/auth';
import { Roles } from 'src/app/core/models/roles';
import { CurrentUserService } from 'src/app/core/permission/services';
import { DialogService } from 'src/app/layout/dialogs/services/dialog.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private _translate: TranslateService,
    private _dialogService: DialogService,
    private _auth: AuthService,
    private _router: Router,
    private _currentUserService: CurrentUserService
  ) {}

  public ngOnInit(): void {}

  public openRegisterDialog(): void {
    if (this._auth.isAuthenticated()) {
      this.defineRedirectRoute();
      return;
    }
    this._dialogService.openRegisterDialog();
  }

  public openLoginDialog(): void {
    if (this._auth.isAuthenticated()) {
      this.defineRedirectRoute();
      return;
    }
    this._dialogService.openLoginDialog();
  }

  public onUkraineLangClick(): void {
    this._translate.setDefaultLang('ua');
    this._translate.use('ua');
    localStorage.setItem('language', 'ua');
  }

  public onUsaLangClick(): void {
    this._translate.setDefaultLang('en');
    this._translate.use('en');
    localStorage.setItem('language', 'en');
  }

  public onRussiaLangClick(): void {
    this._translate.setDefaultLang('ru');
    this._translate.use('ru');
    localStorage.setItem('language', 'ru');
  }

  public onScrollDownClick($event: Event) {
    $event.preventDefault();
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }

  private defineRedirectRoute(): void {
    const userInfo: UserInfo = this._currentUserService.userInfo;
    switch (userInfo.role) {
      case Roles.Carrier:
        this._router.navigate(['/optimized-requests']);
        break;
      case Roles.CompanyAdmin:
        this._router.navigate(['/carrier-management']);
        break;
      default:
        this._router.navigate(['/dashboard']);
    }
  }
}
