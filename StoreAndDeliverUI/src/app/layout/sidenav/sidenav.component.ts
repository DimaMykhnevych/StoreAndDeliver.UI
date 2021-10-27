import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public sidenavWidth = 4;
  constructor() {}

  public ngOnInit(): void {}

  increase(sidenav: MatSidenav) {
    sidenav.close();
    setTimeout(() => {
      sidenav.open();
      this.sidenavWidth = 20;
    });
  }
  decrease(sidenav: MatSidenav) {
    sidenav.close();
    setTimeout(() => {
      sidenav.open();
      this.sidenavWidth = 4;
    });
  }
}
