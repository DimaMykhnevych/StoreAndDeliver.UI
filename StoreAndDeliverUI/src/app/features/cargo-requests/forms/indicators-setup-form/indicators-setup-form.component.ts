import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
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
import { IndicatorItemFormComponent } from '../indicator-item-form/indicator-item-form.component';

@Component({
  selector: 'app-indicators-setup-form',
  templateUrl: './indicators-setup-form.component.html',
  styleUrls: ['./indicators-setup-form.component.scss'],
})
export class IndicatorsSetupFormComponent implements OnInit, OnDestroy {
  @ViewChild('indicatorItemForm')
  public indicatorItemForm: IndicatorItemFormComponent = null as any;
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  @Input() public set initialCargo(r: CargoAddModel) {
    this._cargo = r;
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
  public selectedIndex = 0;

  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onIndicatorSettingValueChanges(): void {
    this._cargo.cargo[this.selectedIndex].settings =
      this.indicatorItemForm.form.value?.settings;
  }

  public onCargoItemClick(selectedCargoIndex: number): void {
    this.selectedIndex = selectedCargoIndex;
  }

  private subscribeOnFormValueChanges(): void {
    this.formArray.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.valueChanges.emit();
      });
  }
}
