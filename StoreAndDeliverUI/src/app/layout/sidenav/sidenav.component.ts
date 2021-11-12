import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserInfo } from 'src/app/core/auth/models/user-info';
import { Roles } from 'src/app/core/models/roles';
import { CurrentUserService } from 'src/app/core/permission/services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public sidenavWidth = 4;
  public userInfo: UserInfo = null as any;
  public createRequestTabAccess: string[] = [Roles.User];
  public reviewOptimizedRequests: string[] = [Roles.Carrier];
  constructor(private _currentUserService: CurrentUserService) {}

  public ngOnInit(): void {
    this.userInfo = this._currentUserService.userInfo;
  }

  public showTab(tabName: string): boolean {
    switch (tabName) {
      case 'createRequest':
        return this.createRequestTabAccess.includes(this.userInfo.role || '');
      case 'reviewOptimized':
        return this.reviewOptimizedRequests.includes(this.userInfo.role || '');
      default:
        return false;
    }
  }

  public increase(sidenav: MatSidenav) {
    sidenav.close();
    setTimeout(() => {
      sidenav.open();
      this.sidenavWidth = 20;
    });
  }
  public decrease(sidenav: MatSidenav) {
    sidenav.close();
    setTimeout(() => {
      sidenav.open();
      this.sidenavWidth = 4;
    });
  }
}
