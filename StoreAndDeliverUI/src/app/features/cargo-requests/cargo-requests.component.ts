import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
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
  public cargo: CargoAddModel = { cargo: [] };
  constructor() {}

  public ngOnInit(): void {}

  public onNavigateTabButtonClick(
    tabGroup: MatTabGroup,
    forward: boolean
  ): void {
    this.goToNextTabIndex(tabGroup, forward);
  }

  private goToNextTabIndex(tabGroup: MatTabGroup, forward: boolean): void {
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

    const tabCount = tabGroup._tabs.length;
    if (forward) {
      tabGroup.selectedIndex = ((tabGroup?.selectedIndex || 0) + 1) % tabCount;
    } else {
      tabGroup.selectedIndex = ((tabGroup?.selectedIndex || 0) - 1) % tabCount;
    }
  }
}
