import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { GetOptimizedRequestModel } from '../../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';
import { CargoSessionService } from '../../services/cargo-session.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-optimized-cargo-requests-review',
  templateUrl: './optimized-cargo-requests-review.component.html',
  styleUrls: ['./optimized-cargo-requests-review.component.scss'],
})
export class OptimizedCargoRequestsReviewComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  private _destroy$: Subject<void> = new Subject<void>();
  public selectedRequestType: string = RequestType.Deliver.toString();
  public selectedRequestStatus: RequestStatus = RequestStatus.pending;
  public statuses: RequestStatus[] = [
    RequestStatus.pending,
    RequestStatus.inProgress,
    RequestStatus.completed,
  ];

  constructor(
    private _requestService: RequestService,
    private _translateService: TranslateService,
    private _cargoSessionService: CargoSessionService
  ) {}

  public ngOnInit(): void {
    this.getOptimizedRequests();
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (this.selectedRequestStatus != RequestStatus.pending) {
          this.getCarrierRequests();
        } else {
          this.getOptimizedRequests();
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onUnitSelectionChanged(): void {
    if (this.selectedRequestStatus != RequestStatus.pending) {
      this.getCarrierRequests();
    } else {
      this.getOptimizedRequests();
    }
  }

  public onRequestTypeSelectionChange(): void {
    if (this.selectedRequestStatus != RequestStatus.pending) {
      this.getCarrierRequests();
    } else {
      this.getOptimizedRequests();
    }
  }

  public onRequestStatusSelectionChange(): void {
    if (this.selectedRequestStatus != RequestStatus.pending) {
      this.getCarrierRequests();
    } else {
      this.getOptimizedRequests();
    }
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
    this._requestService
      .updateRequestStatuses(requestGroup)
      .subscribe(() => {});
  }

  public getStatusName(status: RequestStatus): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(status);
  }

  private getCarrierRequests(): void {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: this.selectedRequestStatus,
    };
    this._cargoSessionService
      .getCarrierRequests(requestModel)
      .subscribe((resp) => {
        this.cargoRequestsGroups = [];
        this.cargoRequestsGroups.push(resp);
      });
  }

  private getOptimizedRequests(): void {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: this.selectedRequestStatus,
    };
    this._requestService
      .getOptimizedRequests(requestModel)
      .subscribe((resp) => {
        this.cargoRequestsGroups = resp;
      });
  }
}
