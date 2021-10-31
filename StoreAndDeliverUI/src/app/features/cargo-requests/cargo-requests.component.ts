import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/core/models/cargo';
import { Request } from 'src/app/core/models/request';
import { CargoAddModel } from './models/cargo-add-model';

@Component({
  selector: 'app-cargo-requests',
  templateUrl: './cargo-requests.component.html',
  styleUrls: ['./cargo-requests.component.scss'],
})
export class CargoRequestsComponent implements OnInit {
  public request: Request = {};
  public cargo: CargoAddModel = {};
  constructor() {}

  public ngOnInit(): void {}
}
