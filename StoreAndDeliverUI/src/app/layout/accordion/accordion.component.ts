import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestStatus } from 'src/app/core/enums/request-status';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status.mapper';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() cargoRequests: CargoRequest[] = [];
  expandedIndex = 0;
  constructor(
    private _translateService: TranslateService,
    private _customTranslateService: CustomTranslateService
  ) {}

  public ngOnInit(): void {}
  public getStatusName(index: number): string {
    const mapper = new RequestStatusMapper(this._translateService);
    return mapper.getRequestStatusString(this.cargoRequests[index].status);
  }

  public translateSetting(setting: string): string {
    return this._customTranslateService.translateUnit(setting);
  }

  public defineCardClass(index: number): string {
    switch (this.cargoRequests[index].status) {
      case RequestStatus.completed:
        return 'completed';
      case RequestStatus.inProgress:
        return 'inProgress';
      case RequestStatus.pending:
        return 'pending';
      case RequestStatus.rejected:
        return 'rejected';
      default:
        return 'pending';
    }
  }
}
