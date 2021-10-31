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
  private _destroy$: Subject<void> = new Subject<void>();
  @Input() public set request(r: Request) {
    this._request = r;
  }
  public get request(): Request {
    return this._request;
  }
  public _request: Request = null as any;

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnFormValueChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public isStoreRequest(): boolean {
    return this._request?.requestType == RequestType.Store;
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      carryOutBefore: new FormControl(this._request?.carryOutBefore, [
        Validators.required,
      ]),
      storeFromDate: new FormControl(this._request?.storeFromDate, [
        Validators.required,
      ]),
      storeUntilDate: new FormControl(this._request?.storeUntilDate, [
        Validators.required,
      ]),
      isSecurityModeEnabled: new FormControl(
        this._request?.isSecurityModeEnabled
      ),
    });
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
