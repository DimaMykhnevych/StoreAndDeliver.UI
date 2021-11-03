import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from 'src/app/core/models/address';
import { City } from 'src/app/core/models/city';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  @Output() public cityValueChanges: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public countryValueChanges: EventEmitter<string> =
    new EventEmitter<string>();
  public form: FormGroup = this._builder.group({});
  private _destroy$: Subject<void> = new Subject<void>();
  @Input() public set address(r: Address) {
    this._address = r;
  }
  public get address(): Address {
    return this._address;
  }
  @Input() public set cities(r: City[]) {
    this._cityNames = r
      .map((v) => v.cityName)
      .filter((v, i, a) => a.indexOf(v) === i);
    this._countryNames = r
      .map((v) => v.country)
      .filter((v, i, a) => a.indexOf(v) === i);
  }
  public get cityNames(): string[] {
    return this.city?.value?.length >= 2 ? this._cityNames : [];
  }
  public get countryNames(): string[] {
    return this.country?.value?.length >= 2 ? this._countryNames : [];
  }

  private _address: Address = null as any;
  private _cityNames: string[] = [];
  private _countryNames: string[] = [];

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnFormValueChanges();
    this.subscribeOnCityChanges();
    this.subscribeOnCountryChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.valueChanges.emit();
    });
  }

  private subscribeOnCityChanges(): void {
    this.city?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.cityValueChanges.emit(this.city?.value);
    });
  }

  private subscribeOnCountryChanges(): void {
    this.country?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.countryValueChanges.emit(this.country?.value);
    });
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      country: new FormControl(this._address?.country, [Validators.required]),
      city: new FormControl(this._address?.city, [Validators.required]),
      street: new FormControl(this._address?.street, [Validators.required]),
      number: new FormControl(1, Validators.required),
    });
  }

  get country() {
    return this.form.get('country');
  }
  get city() {
    return this.form.get('city');
  }
  get street() {
    return this.form.get('street');
  }
  get number() {
    return this.form.get('number');
  }
}
