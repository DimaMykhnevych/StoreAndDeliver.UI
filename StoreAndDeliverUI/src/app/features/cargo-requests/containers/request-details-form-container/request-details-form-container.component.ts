import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Request } from 'src/app/core/models/request';
import { AddressFormComponent } from '../../forms/address-form/address-form.component';
import { RequestDetailsFormComponent } from '../../forms/request-details-form/request-details-form.component';

@Component({
  selector: 'app-request-details-form-container',
  templateUrl: './request-details-form-container.component.html',
  styleUrls: ['./request-details-form-container.component.scss'],
})
export class RequestDetailsFormContainerComponent implements OnInit {
  @ViewChild('requestDetails')
  public requestTypeForm: RequestDetailsFormComponent = null as any;
  @ViewChild('fromAddressForm')
  public fromAddressForm: AddressFormComponent = null as any;
  @ViewChild('toAddressForm')
  public toAddressForm: AddressFormComponent = null as any;
  @Input() public set request(r: Request) {
    this._request = r;
  }
  public get request(): Request {
    return this._request;
  }
  public _request: Request = null as any;
  constructor() {}

  public ngOnInit(): void {}

  public onDetailsValueChanges(): void {
    this._request.carryOutBefore =
      this.requestTypeForm?.form.value.carryOutBefore;
    this._request.storeFromDate =
      this.requestTypeForm?.form.value.storeFromDate;
    this._request.storeUntilDate =
      this.requestTypeForm?.form.value.storeUntilDate;
    this._request.isSecurityModeEnabled =
      this.requestTypeForm?.form.value.isSecurityModeEnabled;
  }

  public onFromAddressValueChanges(): void {
    this._request.fromAddress = {};
    this._request.fromAddress!.city = this.fromAddressForm?.form.value.city;
    this._request.fromAddress!.country =
      this.fromAddressForm?.form.value.country;
    this._request.fromAddress!.street = this.fromAddressForm?.form.value.street;
  }

  public onToAddressValueChanges(): void {
    this._request.toAddress = {};
    this._request.toAddress!.city = this.toAddressForm?.form.value.city;
    this._request.toAddress!.country = this.toAddressForm?.form.value.country;
    this._request.toAddress!.street = this.toAddressForm?.form.value.street;
  }
}
