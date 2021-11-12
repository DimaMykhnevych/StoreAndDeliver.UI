import { DatePipe } from '@angular/common';
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
  constructor(private datePipe: DatePipe) {}

  public ngOnInit(): void {}

  public isDeliveryRequest(): boolean {
    return this.currentRequest?.type === RequestType.Deliver;
  }

  public getDateFormat(date: Date | undefined): string {
    const currentLanguage = localStorage.getItem('language');
    switch (currentLanguage) {
      case 'ua':
        return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
      case 'ru':
        return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
      case 'en':
      default:
        return this.datePipe.transform(date, 'MM/dd/yyyy') || '';
    }
  }

  public getCurrencyUnit(): string {
    const currentLanguage = localStorage.getItem('language');
    switch (currentLanguage) {
      case 'ua':
        return 'гривень(uah)';
      case 'ru':
        return 'рублей(rub)';
      case 'en':
      default:
        return '$ (usd)';
    }
  }
}
