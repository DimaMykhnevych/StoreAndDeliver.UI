import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { Roles } from 'src/app/core/models/roles';
import { Units } from 'src/app/core/models/units';
import { CurrentUserService } from 'src/app/core/permission/services';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { GetCargoSnapshots } from 'src/app/features/cargo-requests/models/get-cargo-snapshots-model';
import { CargoRequestService } from 'src/app/features/cargo-requests/services/cargo-request.service';
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
  public isCargoPhotosLoading: boolean = false;
  expandedIndex = 0;
  constructor(
    private _translateService: TranslateService,
    private _customTranslateService: CustomTranslateService,
    private _cargoSnapshotService: CargoSnapshotService,
    private _dialofService: DialogService,
    private _currentUserService: CurrentUserService,
    private _cargoRequestService: CargoRequestService
  ) {}

  public ngOnInit(): void {}
  public getStatusName(index: number): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(this.cargoRequests[index].status);
  }

  public isStatusInProgress(index: number): boolean {
    return this.cargoRequests[index]?.status === RequestStatus.inProgress;
  }

  public showPhotosButtonVisible(index: number): boolean {
    return (
      this.isStatusInProgressOrCompleted(index) &&
      this._currentUserService.userInfo.role === Roles.User
    );
  }

  public uploadPhotosButtonVisible(index: number): boolean {
    return (
      this.isStatusInProgressOrCompleted(index) &&
      this._currentUserService.userInfo.role === Roles.Carrier
    );
  }

  public isStatusInProgressOrCompleted(index: number): boolean {
    return (
      this.cargoRequests[index]?.status === RequestStatus.inProgress ||
      this.cargoRequests[index]?.status === RequestStatus.completed
    );
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

  public onShowPhotosClick(index: number): void {
    this.isCargoPhotosLoading = true;
    this._cargoRequestService
      .getCargoPhotos(this.cargoRequests[index]?.id)
      .subscribe((resp) => {
        this.isCargoPhotosLoading = false;
        this._dialofService.openShowPhotosDialog(resp);
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
