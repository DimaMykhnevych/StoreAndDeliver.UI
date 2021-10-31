import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CargoSetting } from 'src/app/core/models/cargo-setting';
import { EnvironmentSetting } from 'src/app/core/models/environment-setting';
import { CargoAddModel } from '../../models/cargo-add-model';

@Component({
  selector: 'app-indicators-setup-form',
  templateUrl: './indicators-setup-form.component.html',
  styleUrls: ['./indicators-setup-form.component.scss'],
})
export class IndicatorsSetupFormComponent implements OnInit, OnDestroy {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  // public form: FormGroup = this._builder.group({});
  @Input() public set initialCargo(r: CargoAddModel) {
    this._cargo = r;
    this.initializeForm(r);
    this.subscribeOnFormValueChanges();
  }
  public get initialCargo(): CargoAddModel {
    return this._cargo;
  }
  @Input() public set environmentSettings(settings: EnvironmentSetting[]) {
    this._environmentSettings = settings;
  }
  public get environmentSettings(): EnvironmentSetting[] {
    return this._environmentSettings;
  }
  private _environmentSettings: EnvironmentSetting[] = [];
  private _cargo: CargoAddModel = null as any;
  private _destroy$: Subject<void> = new Subject<void>();
  public formArray = new FormArray([]);

  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscribeOnFormValueChanges(): void {
    this.formArray.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.valueChanges.emit();
      });
  }

  private initializeForm(addModel: CargoAddModel): void {}
}
