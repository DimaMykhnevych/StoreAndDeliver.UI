import { Component, OnInit } from '@angular/core';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { EnvironmentSettingService } from '../../services/environment-setting.service';

@Component({
  selector: 'app-indicators-setup-container',
  templateUrl: './indicators-setup-container.component.html',
  styleUrls: ['./indicators-setup-container.component.scss'],
})
export class IndicatorsSetupContainerComponent implements OnInit {
  public settings: EnvironmentSetting[] = [];
  constructor(private _envSettingsService: EnvironmentSettingService) {}

  public ngOnInit(): void {
    this.getEnvironmentSettings();
  }

  private getEnvironmentSettings(): void {
    this._envSettingsService.getEnvironmentSettings().subscribe((resp) => {
      this.settings = resp;
    });
  }
}
