import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { IndicatorsSetupFormComponent } from '../../forms/indicators-setup-form/indicators-setup-form.component';
import { CargoAddModel } from '../../models/cargo-add-model';
import { EnvironmentSettingService } from '../../services/environment-setting.service';

@Component({
  selector: 'app-indicators-setup-container',
  templateUrl: './indicators-setup-container.component.html',
  styleUrls: ['./indicators-setup-container.component.scss'],
})
export class IndicatorsSetupContainerComponent implements OnInit {
  public settings: EnvironmentSetting[] = [];
  @ViewChild('indicatorsSetupForm')
  public indicatorsSetupForm: IndicatorsSetupFormComponent = null as any;
  @Input() public set cargo(r: CargoAddModel) {
    this._cargo = r;
  }
  public get cargo(): CargoAddModel {
    return this._cargo;
  }
  public _cargo: CargoAddModel = null as any;

  constructor(private _envSettingsService: EnvironmentSettingService) {}

  public ngOnInit(): void {
    this.getEnvironmentSettings();
  }

  public onValueChanges(): void {
    // this._cargo[0].settings = this.indicatorsSetupForm.form.value?.settings;
  }

  private getEnvironmentSettings(): void {
    this._envSettingsService.getEnvironmentSettings().subscribe((resp) => {
      this.settings = resp;
    });
  }
}
