import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { DialogService } from 'src/app/layout/dialogs/services/dialog.service';
import { GetOptimizedRequestModel } from '../../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';
import { UpdateCargoRequests } from '../../models/update-cargo-reauests';
import { CargoSessionService } from '../../services/cargo-session.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-optimized-cargo-requests-review',
  templateUrl: './optimized-cargo-requests-review.component.html',
  styleUrls: ['./optimized-cargo-requests-review.component.scss'],
})
export class OptimizedCargoRequestsReviewComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  public selectedRequestType: string = RequestType.Deliver.toString();
  public selectedRequestStatus: RequestStatus = RequestStatus.pending;
  public statuses: RequestStatus[] = [
    RequestStatus.pending,
    RequestStatus.inProgress,
    RequestStatus.completed,
  ];
  private _destroy$: Subject<void> = new Subject<void>();
  private isRequestSuccessfull: boolean = true;
  constructor(
    private _requestService: RequestService,
    private _translateService: TranslateService,
    private _cargoSessionService: CargoSessionService,
    private _dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.getOptimizedRequests().subscribe((resp) => {
      this.cargoRequestsGroups = resp;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onUnitSelectionChanged(): void {
    this.getRequestedCargoRequests();
  }

  public onRequestTypeSelectionChange(): void {
    this.getRequestedCargoRequests();
  }

  public onRequestStatusSelectionChange(): void {
    this.getRequestedCargoRequests();
  }

  public onRequestGroupAction(requestGroup: OptimizedRequestsGroup): void {
    for (let key in requestGroup) {
      for (let i = 0; i < requestGroup[key].length; i++) {
        requestGroup[key][i].status =
          this.selectedRequestStatus === RequestStatus.pending
            ? RequestStatus.inProgress
            : this.selectedRequestStatus === RequestStatus.inProgress
            ? RequestStatus.completed
            : RequestStatus.other;
      }
    }
    const updateRequestBody: UpdateCargoRequests = {
      requestGroup: requestGroup,
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
    };
    this.updateRequestStatuses(updateRequestBody);
  }

  public getStatusName(status: RequestStatus): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(status);
  }

  private updateRequestStatuses(requestGroup: UpdateCargoRequests): void {
    this._requestService
      .updateRequestStatuses(requestGroup)
      .pipe(
        switchMap((resp) => {
          this.isRequestSuccessfull = resp;
          if (!resp) {
            return of({});
          }
          if (this.selectedRequestStatus != RequestStatus.pending) {
            return this.getCarrierRequests();
          }
          return this.getOptimizedRequests();
        })
      )
      .subscribe((resp) => {
        if (this.objectIsEmpty(resp) && !this.isRequestSuccessfull) {
          this.openWarningDialog();
        } else if (Array.isArray(resp)) {
          this.cargoRequestsGroups = resp;
        } else {
          this.cargoRequestsGroups = [];
          this.cargoRequestsGroups.push(resp);
        }
      });
  }

  private openWarningDialog(): void {
    this._dialogService.openWarningDialog({
      title: this._translateService.instant('dialogs.cargoFullTitle'),
      content: this._translateService.instant('dialogs.cargoFullContent'),
    });
  }

  private objectIsEmpty(obj: Object): boolean {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  }

  private getRequestedCargoRequests(): void {
    if (this.selectedRequestStatus != RequestStatus.pending) {
      this.getCarrierRequests().subscribe((resp) => {
        this.cargoRequestsGroups = [];
        this.cargoRequestsGroups.push(resp);
      });
    } else {
      this.getOptimizedRequests().subscribe((resp) => {
        this.cargoRequestsGroups = resp;
      });
    }
  }

  private getCarrierRequests(): Observable<OptimizedRequestsGroup> {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: this.selectedRequestStatus,
    };
    return this._cargoSessionService.getCarrierRequests(requestModel);
  }

  private getOptimizedRequests(): Observable<OptimizedRequestsGroup[]> {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: this.selectedRequestStatus,
    };
    console.log(requestModel);
    return this._requestService.getOptimizedRequests(requestModel);
  }
}
