import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RequestType } from 'src/app/core/enums/request-type';
import { Request } from 'src/app/core/models/request';
import { RequestTypeFormComponent } from '../../forms/request-type-form/request-type-form.component';

@Component({
  selector: 'app-request-type-form-container',
  templateUrl: './request-type-form-container.component.html',
  styleUrls: ['./request-type-form-container.component.scss'],
})
export class RequestTypeFormContainerComponent implements OnInit {
  @Input() public set request(r: Request) {
    this._request = r;
  }
  public get request(): Request {
    return this._request;
  }
  @ViewChild('requestTypeForm')
  public requestTypeForm: RequestTypeFormComponent = null as any;
  public _request: Request = null as any;

  constructor() {}

  public ngOnInit(): void {}

  public onValueChanges(): void {
    this._request.type =
      this.requestTypeForm?.form.value.requestType == '1'
        ? RequestType.Deliver
        : RequestType.Store;
  }
}
