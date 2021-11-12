import { Component, OnInit } from '@angular/core';
import { RequestType } from 'src/app/core/enums/request-type';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-optimized-cargo-requests-review',
  templateUrl: './optimized-cargo-requests-review.component.html',
  styleUrls: ['./optimized-cargo-requests-review.component.scss'],
})
export class OptimizedCargoRequestsReviewComponent implements OnInit {
  public cargoRequestsGroups: OptimizedRequestsGroup[] = [];
  constructor(private _requestService: RequestService) {}

  ngOnInit(): void {
    this.getOptimizedRequests();
  }

  private getOptimizedRequests(): void {
    this._requestService
      .getOptimizedRequests(RequestType.Deliver)
      .subscribe((resp) => {
        this.cargoRequestsGroups = resp;
      });
  }
}
