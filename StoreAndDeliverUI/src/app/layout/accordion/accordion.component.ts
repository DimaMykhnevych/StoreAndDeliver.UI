import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HumidityUnit } from 'src/app/core/enums/humidity-unit';
import { LuminosityUnit } from 'src/app/core/enums/luminosity-unit';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { TemperatureUnit } from 'src/app/core/enums/temperature-unit';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { Units } from 'src/app/core/models/units';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { GetCargoSnapshots } from 'src/app/features/cargo-requests/models/get-cargo-snapshots-model';
import { CargoSnapshotService } from 'src/app/features/cargo-requests/services/cargo-snapshot.service';
import { DialogService } from '../dialogs/services/dialog.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() cargoRequests: CargoRequest[] = [];
  public isCargoSnapshotsLoading: boolean = false;
  expandedIndex = 0;
  constructor(
    private _translateService: TranslateService,
    private _customTranslateService: CustomTranslateService,
    private _cargoSnapshotService: CargoSnapshotService,
    private _dialofService: DialogService
  ) {}

  public ngOnInit(): void {}
  public getStatusName(index: number): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(this.cargoRequests[index].status);
  }

  public isStatusInProgress(index: number): boolean {
    return this.cargoRequests[index]?.status === RequestStatus.inProgress;
  }

  public isDeliveryRequest(index: number): boolean {
    return this.cargoRequests[index]?.request.type === RequestType.Deliver;
  }

  public translateSetting(setting: string): string {
    return this._customTranslateService.translateUnit(setting);
  }

  public onShowCurrentSettingsClick(index: number): void {
    const units: Units = JSON.parse(
      localStorage.getItem('units') || JSON.stringify({})
    );
    const params: GetCargoSnapshots = {
      id: '',
      cargoRequestId: this.cargoRequests[index].id,
      temperature: units.temperature,
      humidity: units.humidity,
      luminosity: units.luminosity,
    };
    this.isCargoSnapshotsLoading = true;
    this._cargoSnapshotService
      .getCargoSnapshotsByCargoRequestId(params)
      .subscribe((resp) => {
        this.isCargoSnapshotsLoading = false;
        this._dialofService.openCargoSnapshotsDialog(resp);
      });
  }

  public defineCardClass(index: number): string {
    switch (this.cargoRequests[index].status) {
      case RequestStatus.completed:
        return 'completed';
      case RequestStatus.inProgress:
        return 'inProgress';
      case RequestStatus.pending:
        return 'pending';
      case RequestStatus.rejected:
        return 'rejected';
      default:
        return 'pending';
    }
  }
}
