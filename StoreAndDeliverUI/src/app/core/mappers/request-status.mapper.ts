import { TranslateService } from '@ngx-translate/core';
import { RequestStatus } from '../enums/request-status';

export class RequestStatusMapper {
  constructor(private _translateService: TranslateService) {}
  private requestStatusDictionary = {
    [RequestStatus.inProgress]: this._translateService.instant(
      'statuses.inProgress'
    ),
    [RequestStatus.rejected]:
      this._translateService.instant('statuses.rejected'),
    [RequestStatus.completed]:
      this._translateService.instant('statuses.completed'),
    [RequestStatus.pending]: this._translateService.instant('statuses.pending'),
  };

  public getRequestStatusString(requestStautsNumber: RequestStatus): string {
    return this.requestStatusDictionary[requestStautsNumber];
  }
}
