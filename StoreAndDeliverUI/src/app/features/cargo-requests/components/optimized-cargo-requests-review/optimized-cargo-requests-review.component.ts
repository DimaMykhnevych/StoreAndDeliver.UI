import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestType } from 'src/app/core/enums/request-type';
import { GetOptimizedRequestModel } from '../../models/get-optimized-requests';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-optimized-cargo-requests-review',
  templateUrl: './optimized-cargo-requests-review.component.html',
  styleUrls: ['./optimized-cargo-requests-review.component.scss'],
})
export class OptimizedCargoRequestsReviewComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  private _destroy$: Subject<void> = new Subject<void>();
  constructor(
    private _requestService: RequestService,
    private _translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getOptimizedRequests();
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.getOptimizedRequests();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onUnitSelectionChanged(): void {
    this.getOptimizedRequests();
  }

  private getOptimizedRequests(): void {
    const requestModel: GetOptimizedRequestModel = {
      requestType: RequestType.Store,
      units: JSON.parse(localStorage.getItem('units') || JSON.stringify({})),
      currentLanguage: localStorage.getItem('language') || 'en',
    };
    this._requestService
      .getOptimizedRequests(requestModel)
      .subscribe((resp) => {
        this.cargoRequestsGroups = resp;
      });
  }
}
