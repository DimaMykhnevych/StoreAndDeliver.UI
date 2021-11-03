import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Request } from 'src/app/core/models/request';
import { CargoFormContainerComponent } from './containers/cargo-form-container/cargo-form-container.component';
import { IndicatorsSetupContainerComponent } from './containers/indicators-setup-container/indicators-setup-container.component';
import { RequestDetailsFormContainerComponent } from './containers/request-details-form-container/request-details-form-container.component';
import { RequestTypeFormContainerComponent } from './containers/request-type-form-container/request-type-form-container.component';
import { AddRequest } from './models/add-request';
import { CargoAddModel } from './models/cargo-add-model';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-cargo-requests',
  templateUrl: './cargo-requests.component.html',
  styleUrls: ['./cargo-requests.component.scss'],
})
export class CargoRequestsComponent implements OnInit {
  public request: Request = {};
  public cargo: CargoAddModel = { cargo: [] };
  @ViewChild('requestTypeForm')
  public requestTypeFormComponent: RequestTypeFormContainerComponent = null as any;
  @ViewChild('requestDetailsForm')
  public requestDetailsFormComponent: RequestDetailsFormContainerComponent = null as any;
  @ViewChild('cargoForm')
  public cargoFormComponent: CargoFormContainerComponent = null as any;
  @ViewChild('indicatorsSetupForm')
  public indicatorsSetupFormComponent: IndicatorsSetupContainerComponent = null as any;
  constructor(private _requestService: RequestService) {}

  public ngOnInit(): void {}

  public onNavigateTabButtonClick(
    tabGroup: MatTabGroup,
    forward: boolean
  ): void {
    this.navigateToTab(tabGroup, forward);
  }

  public onSubmitButtonClick(): void {
    const addRequestModel = this.buildRequestAddResult();
    this._requestService
      .getRequestTotalSum(addRequestModel)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  private buildRequestAddResult(): AddRequest {
    this.setDefaultRequestValues();
    const addRequest: AddRequest = {
      request: this.request,
      cargo: this.cargo.cargo,
      currentLanguage: localStorage.getItem('language') || 'en',
    };
    return addRequest;
  }

  private navigateToTab(tabGroup: MatTabGroup, forward: boolean): void {
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

    const tabCount = tabGroup._tabs.length;
    if (forward) {
      tabGroup.selectedIndex = ((tabGroup?.selectedIndex || 0) + 1) % tabCount;
    } else {
      tabGroup.selectedIndex = ((tabGroup?.selectedIndex || 0) - 1) % tabCount;
    }
  }

  private setDefaultRequestValues(): void {
    this.request.isSecurityModeEnabled =
      this.request.isSecurityModeEnabled ?? false;
    this.request.storeFromDate = this.request.storeFromDate ?? new Date();
    this.request.storeUntilDate = this.request.storeUntilDate ?? new Date();
    this.request.carryOutBefore = this.request.carryOutBefore ?? new Date();
  }
}
