import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/auth';
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
    private _router: Router
  ) {}

  public ngOnInit(): void {}

  public openRegisterDialog(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/dashboard']);
      return;
    }
    this._dialogService.openRegisterDialog();
  }

  public openLoginDialog(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/dashboard']);
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

  onScrollDownClick($event: Event) {
    $event.preventDefault();
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }
}
