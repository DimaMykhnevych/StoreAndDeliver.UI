import { Component, Input, OnInit } from '@angular/core';
import { RequestType } from 'src/app/core/enums/request-type';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { Request } from 'src/app/core/models/request';

@Component({
  selector: 'app-cargo-request-item',
  templateUrl: './cargo-request-item.component.html',
  styleUrls: ['./cargo-request-item.component.scss'],
})
export class CargoRequestItemComponent implements OnInit {
  @Input() set cargoRequests(cr: CargoRequest[]) {
    this._cargoRequests = cr;
    this.currentRequest = cr[0].request;
  }
  get cargoRequests(): CargoRequest[] {
    return this._cargoRequests;
  }
  public currentRequest: Request = null as any;
  private _cargoRequests: CargoRequest[] = null as any;
  constructor() {}

  public ngOnInit(): void {}

  public isDeliveryRequest(): boolean {
    return this.currentRequest?.type === RequestType.Deliver;
  }
}
