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
import { RequestType } from 'src/app/core/enums/request-type';
import { Request } from 'src/app/core/models/request';

@Component({
  selector: 'app-request-details-form',
  templateUrl: './request-details-form.component.html',
  styleUrls: ['./request-details-form.component.scss'],
})
export class RequestDetailsFormComponent implements OnInit, OnDestroy {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = this._builder.group({});
  public todayDate: Date = new Date();
  private _destroy$: Subject<void> = new Subject<void>();
  @Input() public set request(r: Request) {
    this._request = r;
    this.initializeForm();
    this.subscribeOnFormValueChanges();
  }
  public get request(): Request {
    return this._request;
  }
  public _request: Request = null as any;

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public isStoreRequest(): boolean {
    return this._request?.type == RequestType.Store;
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      carryOutBefore: new FormControl(this._request?.carryOutBefore),
      storeFromDate: new FormControl(this._request?.storeFromDate),
      storeUntilDate: new FormControl(this._request?.storeUntilDate),
      isSecurityModeEnabled: new FormControl(
        this._request?.isSecurityModeEnabled
      ),
    });

    if (this.isStoreRequest()) {
      this.storeFromDate?.setValidators([Validators.required]);
      this.storeUntilDate?.setValidators([Validators.required]);
    } else {
      this.carryOutBefore?.setValidators([Validators.required]);
    }
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.valueChanges.emit();
    });
  }

  get carryOutBefore() {
    return this.form.get('carryOutBefore');
  }

  get storeFromDate() {
    return this.form.get('storeFromDate');
  }

  get storeUntilDate() {
    return this.form.get('storeUntilDate');
  }
  get isSecurityModeEnabled() {
    return this.form.get('isSecurityModeEnabled');
  }
}
