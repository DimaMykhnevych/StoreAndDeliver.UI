import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';
import { CargoSnapshot } from 'src/app/core/models/cargo-snapshot';
import { Units } from 'src/app/core/models/units';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

interface GroupedCargoSnapshots {
  [id: string]: CargoSnapshot[];
}

interface AverageCargoSnapshots {
  settingName: string;
  averageValue: number;
  displayedUnitSymbol: string;
}

@Component({
  selector: 'app-cargo-snapshots-dialog',
  templateUrl: './cargo-snapshots-dialog.component.html',
  styleUrls: ['./cargo-snapshots-dialog.component.scss'],
})
export class CargoSnapshotsDialogComponent implements OnInit {
  private cargoSnapshots: CargoSnapshot[];
  private groupedCargoSnapshots: GroupedCargoSnapshots;
  private groupedCargoSnapshotKeys: string[] = [];
  public averageCargoSnapshots: AverageCargoSnapshots[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) data: CargoSnapshot[],
    private _customTranslateService: CustomTranslateService
  ) {
    this.cargoSnapshots = data;
    this.groupedCargoSnapshots = this.groupSnapshotsByCargoSettings();
    this.getAverageSnapshotsValue();
  }

  public ngOnInit(): void {}

  public translateSetting(setting: string): string {
    return this._customTranslateService.translateUnit(setting);
  }

  public getAverageSnapshotsValue(): void {
    const result: AverageCargoSnapshots[] = [];
    for (let key in this.groupedCargoSnapshots) {
      let sum = 0;
      for (let i = 0; i < this.groupedCargoSnapshots[key].length; i++) {
        sum += this.groupedCargoSnapshots[key][i].value;
      }
      let displayedUnitSymbol: string = this.getDisplayedUnitSymbol(
        this.groupedCargoSnapshots[key][0]
      );
      result.push({
        settingName: this.translateSetting(
          this.groupedCargoSnapshots[key][0].environmentSetting.name
        ),
        averageValue: sum / this.groupedCargoSnapshots[key].length,
        displayedUnitSymbol: displayedUnitSymbol,
      });
    }
    this.averageCargoSnapshots = result;
  }

  private getDisplayedUnitSymbol(snapshot: CargoSnapshot): string {
    const units: Units = JSON.parse(
      localStorage.getItem('units') || JSON.stringify({})
    );
    switch (snapshot.environmentSetting.name) {
      case 'Temperature':
        return units.temperature === TemperatureUnit.Celsius
          ? '°C'
          : units.temperature === TemperatureUnit.Fahrenheit
          ? '°F'
          : 'K';
      case 'Humidity':
        return '%';
      case 'Luminosity':
        return this._customTranslateService.translateUnit('Lux');
      default:
        return '';
    }
  }

  private groupSnapshotsByCargoSettings(): GroupedCargoSnapshots {
    let result = this.cargoSnapshots.reduce((r, a) => {
      r[a.environmentSettingId] = r[a.environmentSettingId] || [];
      r[a.environmentSettingId].push(a);
      return r;
    }, Object.create(null));
    for (let key in result) {
      this.groupedCargoSnapshotKeys.push(key);
    }
    return result;
  }
}
