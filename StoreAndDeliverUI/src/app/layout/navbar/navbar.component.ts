import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';
import { CurrentUserService } from 'src/app/core/permission/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userName: string | undefined = '';
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _userService: CurrentUserService
  ) {}

  public ngOnInit(): void {
    this.userName = this._userService.userInfo.userName;
  }

  public OnLogOutButtonCLick(): void {
    this._authService.unauthorize();
    this.router.navigate(['/home']);
  }
}
