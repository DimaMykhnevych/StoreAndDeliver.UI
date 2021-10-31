import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/core/models/request';

@Component({
  selector: 'app-cargo-requests',
  templateUrl: './cargo-requests.component.html',
  styleUrls: ['./cargo-requests.component.scss'],
})
export class CargoRequestsComponent implements OnInit {
  public request: Request = {};
  constructor() {}

  public ngOnInit(): void {}
}
