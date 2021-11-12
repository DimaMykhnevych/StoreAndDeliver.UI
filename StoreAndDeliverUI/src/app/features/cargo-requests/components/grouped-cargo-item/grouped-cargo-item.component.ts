import { Component, Input, OnInit } from '@angular/core';
import { CargoRequest } from 'src/app/core/models/cargo-request';
import { OptimizedRequestsGroup } from '../../models/optimized-requests';

@Component({
  selector: 'app-grouped-cargo-item',
  templateUrl: './grouped-cargo-item.component.html',
  styleUrls: ['./grouped-cargo-item.component.scss'],
})
export class GroupedCargoItemComponent implements OnInit {
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

  ngOnInit(): void {}
}
