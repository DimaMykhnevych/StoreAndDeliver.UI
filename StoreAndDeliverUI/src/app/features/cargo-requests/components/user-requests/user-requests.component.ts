import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { GetOptimizedRequestModel } from '../../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';
import { CargoRequestService } from '../../services/cargo-request.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss'],
})
export class UserRequestsComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  public selectedRequestType: string = RequestType.Deliver.toString();
  public isLoading: boolean = false;
  public selectedRequestStatus: RequestStatus = RequestStatus.pending;
  public statuses: RequestStatus[] = [
    RequestStatus.pending,
    RequestStatus.inProgress,
    RequestStatus.completed,
  ];

  constructor(
    private _cargoRequestService: CargoRequestService,
    private _translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getUserRequests();
  }

  public getStatusName(status: RequestStatus): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(status);
  }

  public onUnitSelectionChanged(): void {
    this.getUserRequests();
  }

  public onRequestTypeSelectionChange(): void {
    this.getUserRequests();
  }

  public onRequestStatusSelectionChange(): void {
    this.getUserRequests();
  }

  private getUserRequests(): void {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: this.selectedRequestStatus,
    };
    this.isLoading = true;
    this._cargoRequestService
      .getUserRequests(requestModel)
      .subscribe((resp) => {
        this.isLoading = false;
        this.cargoRequestsGroups = [];
        this.cargoRequestsGroups.push(resp);
      });
  }
}
