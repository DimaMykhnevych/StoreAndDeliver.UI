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
import { Request } from 'src/app/core/models/request';

@Component({
  selector: 'app-request-type-form',
  templateUrl: './request-type-form.component.html',
  styleUrls: ['./request-type-form.component.scss'],
})
export class RequestTypeFormComponent implements OnInit, OnDestroy {
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

  private initializeForm(): void {
    this.form = this._builder.group({
      requestType: new FormControl(this._request?.requestType, [
        Validators.required,
      ]),
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.valueChanges.emit();
    });
  }

  get requestType() {
    return this.form.get('requestType');
  }
}
