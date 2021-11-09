import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LengthUnit } from 'src/app/core/enums/length-unit';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { WeightUnit } from 'src/app/core/enums/weight-unit';
import { Request } from 'src/app/core/models/request';
import { CurrentUserService } from 'src/app/core/permission/services';
import { environment } from 'src/environments/environment';
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
  public isLoading: boolean = false;
  public cargo: CargoAddModel = { cargo: [] };
  @ViewChild('requestTypeForm')
  public requestTypeFormComponent: RequestTypeFormContainerComponent = null as any;
  @ViewChild('requestDetailsForm')
  public requestDetailsFormComponent: RequestDetailsFormContainerComponent = null as any;
  @ViewChild('cargoForm')
  public cargoFormComponent: CargoFormContainerComponent = null as any;
  @ViewChild('indicatorsSetupForm')
  public indicatorsSetupFormComponent: IndicatorsSetupContainerComponent = null as any;

  constructor(
    private _requestService: RequestService,
    private _translateService: TranslateService,
    private _currentUserService: CurrentUserService,
    private _toastrService: ToastrService
  ) {}

  public ngOnInit(): void {}

  public onNavigateTabButtonClick(
    tabGroup: MatTabGroup,
    forward: boolean
  ): void {
    this.navigateToTab(tabGroup, forward);
  }

  public onSubmitButtonClick(): void {
    this.isLoading = true;
    const addRequestModel = this.buildRequestAddResult();
    this._requestService
      .getRequestTotalSum(addRequestModel)
      .subscribe((totalSum) => {
        addRequestModel.request.totalSum = totalSum;
        this.openCheckout(() => this.addRequest(addRequestModel), totalSum);
      });
  }

  private addRequest(request: AddRequest): void {
    this._requestService.addRequest(request).subscribe((resp) => {
      if (resp) {
        this._toastrService.success(
          this._translateService.instant('cargoRequest.successRequestAdding')
        );
      }
    });
  }

  private openCheckout(tokenCallback: any, totalSum: number) {
    this.isLoading = false;
    let handler = (<any>window).StripeCheckout?.configure({
      key: environment.stripeKeys.publishableKey,
      locale: 'auto',
      token: tokenCallback,
    });

    let description = this._translateService.instant('payment.header');

    handler?.open({
      name: 'Store&Deliver',
      description: description,
      zipCode: false,
      currency: this.getCurrencyUnit(),
      amount: totalSum * 100,
      panelLabel: `${this._translateService.instant('payment.pay')} {{amount}}`,
      allowRememberMe: false,
      email: this._currentUserService.userInfo.email,
    });
  }

  private getCurrencyUnit(): string {
    const currentLanguage = localStorage.getItem('language');
    switch (currentLanguage) {
      case 'ua':
        return 'uah';
      case 'ru':
        return 'rub';
      case 'en':
      default:
        return 'usd';
    }
  }

  private buildRequestAddResult(): AddRequest {
    this.setDefaultRequestValues();
    const addRequest: AddRequest = {
      request: this.request,
      cargo: this.cargo.cargo,
      currentLanguage: localStorage.getItem('language') || 'en',
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
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
    this.request.toAddress = this.request.toAddress ?? {};
    this.request.status = RequestStatus.Pending;
  }
}
