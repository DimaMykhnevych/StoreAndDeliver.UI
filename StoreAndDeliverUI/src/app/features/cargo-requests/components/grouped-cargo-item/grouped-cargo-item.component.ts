import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';

@Component({
  selector: 'app-grouped-cargo-item',
  templateUrl: './grouped-cargo-item.component.html',
  styleUrls: ['./grouped-cargo-item.component.scss'],
})
export class GroupedCargoItemComponent implements OnInit {
  @Output()
  public onRequestGroupAccepted: EventEmitter<OptimizedRequestsGroup> = new EventEmitter<OptimizedRequestsGroup>();
  @Output()
  public onRequestGroupCompleted: EventEmitter<OptimizedRequestsGroup> = new EventEmitter<OptimizedRequestsGroup>();
  @Input() public requestStatus: RequestStatus = RequestStatus.pending;
  @Input() set cargoRequestsGroup(crg: OptimizedRequestsGroup) {
    this._cargoRequestsGroup = crg;
    for (let key in crg) {
      this.keys.push(key);
    }
  }
  get cargoRequestsGroup(): OptimizedRequestsGroup {
    return this._cargoRequestsGroup;
  }

  private _cargoRequestsGroup: OptimizedRequestsGroup = null as any;
  public keys: string[] = [];
  constructor() {}

  public ngOnInit(): void {}

  public onAcceptButtonClick(): void {
    this.onRequestGroupAccepted.emit(this.cargoRequestsGroup);
  }

  public onCompleteButtonClick(): void {
    this.onRequestGroupCompleted.emit(this.cargoRequestsGroup);
  }

  public isRequestInPendingStatus(): boolean {
    return this.requestStatus === RequestStatus.pending;
  }
  public isRequestInCompletedStatus(): boolean {
    return this.requestStatus === RequestStatus.completed;
  }
  public isRequestInProgressStatus(): boolean {
    return this.requestStatus === RequestStatus.inProgress;
  }
}
