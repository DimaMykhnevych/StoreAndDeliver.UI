import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/core/models/city';
import { Store } from 'src/app/core/models/store';
import { StoreService } from 'src/app/features/admin-features/services/store.service';
import { AddressFormComponent } from 'src/app/features/cargo-requests/forms/address-form/address-form.component';
import { SearchCity } from 'src/app/features/cargo-requests/models/search-city';
import { CityService } from 'src/app/features/cargo-requests/services/city.service';
import { AddEditStoreDialogData } from '../models/add-edit-store-data';

enum SearchItem {
  City,
  Country,
  Other = 100,
}

@Component({
  selector: 'app-add-edit-store-dialog',
  templateUrl: './add-edit-store-dialog.component.html',
  styleUrls: ['./add-edit-store-dialog.component.scss'],
})
export class AddEditStoreDialogComponent implements OnInit {
  public data: AddEditStoreDialogData;
  public form: FormGroup = this._builder.group({});
  public isAddingStore: boolean = false;
  public cities: City[] = [];
  @ViewChild('addressForm')
  public addressForm: AddressFormComponent = null as any;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddEditStoreDialogData,
    private _dialogRef: MatDialogRef<AddEditStoreDialogComponent>,
    private _builder: FormBuilder,
    private _storeService: StoreService,
    private _cityService: CityService
  ) {
    this.data = data;
  }

  public ngOnInit(): void {
    this.initializeForm(this.data.store);
  }

  public onActionClick(): void {
    if (this.data.isAdding) {
      this.addStore();
    }
  }

  public onAddressCityValueChanges(newCityName: string): void {
    this.searchLocations(
      {
        city: newCityName,
        country: this.addressForm?.country?.value,
      },
      SearchItem.City
    );
  }

  public onAddressCountryValueChanges(newCountryName: string): void {
    this.searchLocations(
      {
        city: this.addressForm?.city?.value,
        country: newCountryName,
      },
      SearchItem.Country
    );
  }

  private addStore(): void {
    const store: Store = this.form.value;
    store.address = this.addressForm.form.value;
    this._storeService.addStore(store).subscribe((resp) => {
      this._dialogRef.close(true);
    });
  }

  private searchLocations(params: SearchCity, searchItem: SearchItem): void {
    if (
      searchItem === SearchItem.City
        ? params.city.length >= 2
        : params.country.length >= 2
    ) {
      this._cityService.getCities(params).subscribe((cities) => {
        this.cities = cities.filter((v, i, a) => a.indexOf(v) === i);
      });
    }
  }

  private initializeForm(store: Store): void {
    this.form = this._builder.group({
      name: new FormControl(store?.name ?? '', [Validators.required]),
      maxCargoVolume: new FormControl(store?.maxCargoVolume ?? '', [
        Validators.required,
      ]),
    });
  }

  get name() {
    return this.form.get('name');
  }
  get maxCargoVolume() {
    return this.form.get('maxCargoVolume');
  }
}
