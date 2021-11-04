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
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableUnits } from 'src/app/core/constants/unit-constants';
import { UnitType } from 'src/app/core/enums/unit-type';
import { Cargo } from 'src/app/core/models/cargo';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { CargoAddModel } from '../../models/cargo-add-model';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss'],
})
export class CargoFormComponent implements OnInit, OnDestroy {
  @Output() public valueChanges: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = this._builder.group({});

  public availableWeightUnits = AvailableUnits.availableWeightUnits;
  public availableLengthUnits = AvailableUnits.availableLengthUnits;
  public weightUnitType = UnitType.Weight;
  public lengthUnitType = UnitType.Length;
  public weightHeader = '';
  public lengthHeader = '';
  public defaultWeightUnit: number = 0;
  public defaultLengthUnit: number = 0;

  private _formArray = [this.getFormArrayElement()];
  private _destroy$: Subject<void> = new Subject<void>();
  @Input() public set initialCargo(r: CargoAddModel) {
    this._cargo = r;
    this.initializeForm(r);
    this.subscribeOnFormValueChanges();
  }
  public get initialCargo(): CargoAddModel {
    return this._cargo;
  }
  private _cargo: CargoAddModel = null as any;

  constructor(
    private _builder: FormBuilder,
    private _translateService: TranslateService,
    private _customTranslateService: CustomTranslateService
  ) {}

  public ngOnInit(): void {
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp) => {
        this.getUnitTypeHeader();
        this.getDefaultUnit(resp.lang);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onAddCargoClick() {
    this.cargo.push(this.getFormArrayElement());
  }

  public onDeleteCargoClick(index: number): void {
    this.cargo.removeAt(index);
  }

  public getCurrentFormControl(
    index: number,
    controlName: string
  ): AbstractControl | null {
    return this.cargo.controls[index].get(controlName);
  }

  public getUnitTypeHeader(): void {
    this._translateService.get('common.weightUnit').subscribe((resp) => {
      this.weightHeader = resp;
    });
    this._translateService.get('common.lengthUnit').subscribe((resp) => {
      this.lengthHeader = resp;
    });
  }

  public getDefaultUnit(language: string): void {
    this.defaultLengthUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Length,
      language
    );
    this.defaultWeightUnit = this._customTranslateService.getDefaultUnit(
      UnitType.Weight,
      language
    );
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.valueChanges.emit();
    });
  }

  private initializeForm(cargo: CargoAddModel): void {
    if (cargo.cargo != undefined && cargo.cargo?.length != 0) {
      this._formArray = [];
      cargo.cargo?.forEach((c) => {
        this._formArray.push(this.getFormArrayElement(c));
      });
    }
    this.form = this._builder.group({
      cargo: this._builder.array(this._formArray),
    });
  }

  private getFormArrayElement(data?: Cargo): FormGroup {
    return this._builder.group({
      weight: new FormControl(data?.weight, [Validators.required]),
      amount: new FormControl(data?.amount, [Validators.required]),
      length: new FormControl(data?.length, [Validators.required]),
      width: new FormControl(data?.width, [Validators.required]),
      height: new FormControl(data?.height, [Validators.required]),
      description: new FormControl(data?.description, [Validators.required]),
    });
  }

  get cargo() {
    return this.form.get('cargo') as FormArray;
  }
}
