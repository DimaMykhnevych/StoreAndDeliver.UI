import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfoService } from 'src/app/core/auth';

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
    private _userService: UserInfoService
  ) {}

  public ngOnInit(): void {
    this.loadUserData();
  }

  public loadUserData(): void {
    this._userService.loadUserInfo().subscribe((resp) => {
      this.userName = resp.userName;
    });
  }

  public OnLogOutButtonCLick(): void {
    this._authService.unauthorize();
    this.router.navigate(['/home']);
  }
}
