import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AuthForm,
  AuthResponse,
  AuthService,
  UserInfo,
} from 'src/app/core/auth';
import { LoginErrorCodes } from 'src/app/core/auth/enums/login-errors-code.enum';
import { Roles } from 'src/app/core/models/roles';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  public authResponse: AuthResponse | undefined;
  public isLoggingIn: boolean = false;

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    public _dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onLoginButtonClick(): void {
    this.login(this.form.value);
  }

  public isInvalidCredentials(): boolean {
    return (
      this.authResponse?.loginErrorCode ===
      LoginErrorCodes.InvalidUsernameOrPassword
    );
  }

  public isEmailConfirmationRequired(): boolean {
    return (
      this.authResponse?.loginErrorCode ===
      LoginErrorCodes.EmailConfirmationRequired
    );
  }

  private login(value: AuthForm): void {
    this.isLoggingIn = true;
    this._auth.authorize(value).subscribe((authResponse: AuthResponse) => {
      this.isLoggingIn = false;
      if (authResponse.isAuthorized) {
        this._dialogRef.close();
        this.defineRedirectRoute(authResponse.userInfo);
      } else {
        this.authResponse = authResponse;
      }
    });
  }

  private defineRedirectRoute(userInfo: UserInfo): void {
    switch (userInfo.role) {
      case Roles.Carrier:
        this._router.navigate(['/optimized-requests']);
        break;
      case Roles.CompanyAdmin:
        this._router.navigate(['/carrier-management']);
        break;
      default:
        this._router.navigate(['/dashboard']);
    }
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }
}
