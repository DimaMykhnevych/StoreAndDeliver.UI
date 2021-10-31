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

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = this._builder.group({});
  private _destroy$: Subject<void> = new Subject<void>();
  @Input() public set address(r: Address) {
    this._address = r;
  }
  public get address(): Address {
    return this._address;
  }
  public _address: Address = null as any;

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnFormValueChanges();
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
