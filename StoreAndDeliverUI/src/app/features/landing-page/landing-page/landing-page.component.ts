import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {}

  public onUkraineLangClick(): void {
    this._translate.setDefaultLang('ua');
    this._translate.use('ua');
  }

  public onUsaLangClick(): void {
    this._translate.setDefaultLang('en');
    this._translate.use('en');
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
