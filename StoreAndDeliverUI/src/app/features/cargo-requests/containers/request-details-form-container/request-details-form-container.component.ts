import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RequestType } from 'src/app/core/enums/request-type';
import { City } from 'src/app/core/models/city';
import { Request } from 'src/app/core/models/request';
import { AddressFormComponent } from '../../forms/address-form/address-form.component';
import { RequestDetailsFormComponent } from '../../forms/request-details-form/request-details-form.component';
import { SearchCity } from '../../models/search-city';
import { CityService } from '../../services/city.service';

enum SearchItem {
  City,
  Country,
  Other = 100,
}

@Component({
  selector: 'app-request-details-form-container',
  templateUrl: './request-details-form-container.component.html',
  styleUrls: ['./request-details-form-container.component.scss'],
})
export class RequestDetailsFormContainerComponent implements OnInit {
  @ViewChild('requestDetails')
  public requestDetialsForm: RequestDetailsFormComponent = null as any;
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
  public citiesFromAddress: City[] = [];
  public citiesToAddress: City[] = [];

  public _request: Request = null as any;
  constructor(private _cityService: CityService) {}

  public ngOnInit(): void {}

  public isFormValid(): boolean {
    if (this.isStoreRequest()) {
      return (
        this.fromAddressForm?.form?.valid &&
        this.requestDetialsForm?.form?.valid
      );
    }
    return (
      this.fromAddressForm?.form?.valid &&
      this.toAddressForm?.form?.valid &&
      this.requestDetialsForm?.form?.valid
    );
  }

  public isStoreRequest(): boolean {
    return this._request?.type == RequestType.Store;
  }

  public onDetailsValueChanges(): void {
    this._request.carryOutBefore =
      this.requestDetialsForm?.form.value.carryOutBefore;
    this._request.storeFromDate =
      this.requestDetialsForm?.form.value.storeFromDate;
    this._request.storeUntilDate =
      this.requestDetialsForm?.form.value.storeUntilDate;
    this._request.isSecurityModeEnabled =
      this.requestDetialsForm?.form.value.isSecurityModeEnabled;
  }

  public onFromAddressValueChanges(): void {
    this.bindFromAddressValues();
  }

  public onToAddressValueChanges(): void {
    this.bindToAddressValues();
  }

  public onToAddressCityValueChanges(newCityName: string): void {
    this.searchLocations(
      {
        city: newCityName,
        country: this.toAddressForm?.country?.value,
      },
      false,
      SearchItem.City
    );
  }

  public onToAddressCountryValueChanges(newCountryName: string): void {
    this.searchLocations(
      {
        city: this.toAddressForm?.city?.value,
        country: newCountryName,
      },
      false,
      SearchItem.Country
    );
  }

  public onFromAddressCityValueChanges(newCityName: string): void {
    this.searchLocations(
      {
        city: newCityName,
        country: this.fromAddressForm?.country?.value,
      },
      true,
      SearchItem.City
    );
  }

  public onFromAddressCountryValueChanges(newCountryName: string): void {
    this.searchLocations(
      {
        city: this.fromAddressForm?.city?.value,
        country: newCountryName,
      },
      true,
      SearchItem.Country
    );
  }

  private bindFromAddressValues(): void {
    this._request.fromAddress = {};
    this._request.fromAddress!.city = this.fromAddressForm?.form.value.city;
    this._request.fromAddress!.country =
      this.fromAddressForm?.form.value.country;
    this._request.fromAddress!.street = this.fromAddressForm?.form.value.street;
  }

  private bindToAddressValues(): void {
    this._request.toAddress = {};
    this._request.toAddress!.city = this.toAddressForm?.form.value.city;
    this._request.toAddress!.country = this.toAddressForm?.form.value.country;
    this._request.toAddress!.street = this.toAddressForm?.form.value.street;
  }

  private searchLocations(
    params: SearchCity,
    isFromAddressCities: boolean,
    searchItem: SearchItem
  ): void {
    if (
      searchItem === SearchItem.City
        ? params.city.length >= 2
        : params.country.length >= 2
    ) {
      this._cityService.getCities(params).subscribe((cities) => {
        if (isFromAddressCities) {
          this.citiesFromAddress = cities;
        } else {
          this.citiesToAddress = cities.filter((v, i, a) => a.indexOf(v) === i);
        }
      });
    }
  }
}
