import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestType } from 'src/app/core/enums/request-type';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { GetOptimizedRequestModel } from '../../cargo-requests/models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../../cargo-requests/models/optimized-requests';
import { CargoRequestService } from '../../cargo-requests/services/cargo-request.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  public selectedRequestType: string = RequestType.Deliver.toString();
  public isLoading: boolean = false;
  public pendingCargoRequests: CargoRequest[] = [];
  public activeCargoRequests: CargoRequest[] = [];
  public completedCargoRequests: CargoRequest[] = [];
  public lastCreatedCargoRequest: CargoRequest[] = null as any;
  constructor(private _cargoRequestService: CargoRequestService) {}

  public ngOnInit(): void {
    this.getUserRequests(this.pendingCargoRequests, RequestStatus.pending);
    this.getUserRequests(this.activeCargoRequests, RequestStatus.inProgress);
    this.getUserRequests(this.completedCargoRequests, RequestStatus.completed);
  }

  private mapGroupsToCargoRequests(collecion: any): void {
    for (let key in this.cargoRequestsGroups[0]) {
      for (let i = 0; i < this.cargoRequestsGroups[0][key].length; i++) {
        const cargoRequest = this.cargoRequestsGroups[0][key][i];
        collecion.push(cargoRequest);
      }
    }
  }
  private getUserRequests(collection: any, status: RequestStatus): void {
    const requestModel: GetOptimizedRequestModel = {
      requestType: Number(this.selectedRequestType),
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
      status: status,
    };
    this.isLoading = true;
    this._cargoRequestService
      .getUserRequests(requestModel)
      .subscribe((resp) => {
        this.isLoading = false;
        this.cargoRequestsGroups = [];
        this.cargoRequestsGroups.push(resp);
        this.mapGroupsToCargoRequests(collection);
      });
  }
}
