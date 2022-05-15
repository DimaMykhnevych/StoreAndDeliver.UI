import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarrierStatistics } from 'src/app/core/models/carrier-statistics';
import { RequestStatistics } from 'src/app/core/models/request-statitics';
import { CarrierService } from 'src/app/features/cargo-requests/services/carrier.service';
import { RequestService } from 'src/app/features/cargo-requests/services/request.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  private _destroy$: Subject<void> = new Subject<void>();

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;

  public xAxisCountryLabel = this._translateService.instant(
    'cargoRequest.country'
  );
  public xAxisCityLabel = this._translateService.instant('cargoRequest.city');
  public yAxisLabel = this._translateService.instant(
    'cargoRequest.requestsCount'
  );
  public xAxisCarrierLabel = this._translateService.instant(
    'common.carrierUsername'
  );
  public yAxisCarrierLabel = this._translateService.instant(
    'cargoRequest.cargoRequestsCount'
  );

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#0366fc'],
    name: '',
    selectable: false,
    group: ScaleType.Linear,
  };

  public countriesStatistics: RequestStatistics[] = [];
  public citiesStatistics: RequestStatistics[] = [];
  public carriersStatistics: CarrierStatistics[] = [];

  constructor(
    private _requestService: RequestService,
    private _carrierService: CarrierService,
    private _translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getRequestsByCountriesStatistics();
    this.getRequestsByCitiesStatistics();
    this.getCarrierStatistics();
    this.subscribeOnLangChange();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscribeOnLangChange(): void {
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.changeAxisText();
      });
  }

  private changeAxisText(): void {
    this.xAxisCountryLabel = this._translateService.instant(
      'cargoRequest.country'
    );
    this.xAxisCityLabel = this._translateService.instant('cargoRequest.city');
    this.yAxisLabel = this._translateService.instant(
      'cargoRequest.requestsCount'
    );
    this.xAxisCarrierLabel = this._translateService.instant(
      'common.carrierUsername'
    );
    this.yAxisCarrierLabel = this._translateService.instant(
      'cargoRequest.cargoRequestsCount'
    );
  }

  private getCarrierStatistics(): void {
    this._carrierService.getCarriersStatistics().subscribe((resp) => {
      this.carriersStatistics = resp;
    });
  }

  private getRequestsByCitiesStatistics(): void {
    this._requestService.getRequestsByCitiesStatistics().subscribe((resp) => {
      this.citiesStatistics = resp;
    });
  }

  private getRequestsByCountriesStatistics(): void {
    this._requestService
      .getRequestsByCountriesStatistics()
      .subscribe((resp) => {
        this.countriesStatistics = resp;
      });
  }
}
