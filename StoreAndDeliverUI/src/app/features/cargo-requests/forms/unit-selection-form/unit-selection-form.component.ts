import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { UnitType } from 'src/app/core/enums/unit-type';
import { UnitMapper } from 'src/app/core/mappers/unit-mapper';
import { Units } from 'src/app/core/models/units';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-unit-selection-form',
  templateUrl: './unit-selection-form.component.html',
  styleUrls: ['./unit-selection-form.component.scss'],
})
export class UnitSelectionFormComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  @Input() public header: string = '';
  @Input() public options: any[] = [];
  @Input() public unitType: UnitType = UnitType.Weight;
  @Input() public set selectedItem(item: number) {
    this._selectedItem = item;
    this.initializeForm();
    this.changeCurrentUnits();
  }
  public get selectedItem(): number {
    return this._selectedItem;
  }

  private _selectedItem: number = 0;
  constructor(
    private _customTranslateService: CustomTranslateService,
    private _builder: FormBuilder
  ) {}

  public ngOnInit(): void {}

  public getOptionDisplayName(option: any): string {
    const mapper = new UnitMapper(this._customTranslateService);
    return mapper.convertUnitToString(this.unitType, option);
  }

  public onSelectionChange(): void {
    this.changeCurrentUnits();
  }

  private changeCurrentUnits(): void {
    const currentSelectedUnits: Units = JSON.parse(
      localStorage.getItem('units') || JSON.stringify({})
    );
    switch (this.unitType) {
      case UnitType.Length:
        currentSelectedUnits.length = this.unit?.value;
        break;
      case UnitType.Weight:
        currentSelectedUnits.weight = this.unit?.value;
        break;
      case UnitType.Temperature:
        currentSelectedUnits.temperature = this.unit?.value;
        break;
      case UnitType.Luminosity:
        currentSelectedUnits.luminosity = this.unit?.value;
        break;
      case UnitType.Humidity:
        currentSelectedUnits.humidity = this.unit?.value;
        break;
    }
    localStorage.setItem('units', JSON.stringify(currentSelectedUnits));
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      unit: new FormControl(this._selectedItem),
    });
  }

  get unit() {
    return this.form.get('unit');
  }
}
