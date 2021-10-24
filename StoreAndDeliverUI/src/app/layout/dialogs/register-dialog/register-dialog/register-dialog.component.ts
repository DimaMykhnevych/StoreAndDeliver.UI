import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistrationForm } from 'src/app/core/auth';
import { AppUser } from 'src/app/core/models/app-user';
import { AppSettings } from 'src/app/core/settings';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  public isUserNameAlreadyTaken: boolean = false;
  public isPasswordsMismatched: boolean = false;
  public isAddingUser: boolean = false;

  constructor(
    private _builder: FormBuilder,
    public _dialogRef: MatDialogRef<RegisterDialogComponent>,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public register(value: RegistrationForm): void {
    this.isAddingUser = true;
    this.isPasswordsMismatched = false;
    this.isUserNameAlreadyTaken = false;
    value.clientURIForEmailConfirmation = AppSettings.confirmEmailPath;
    this._userService
      .create(value)
      .pipe(
        catchError((error) => {
          return this.onCatchError(error);
        })
      )
      .subscribe((user: AppUser) => {
        if (user.id) {
          this.onUserAdded(user);
        }
      });
  }

  private onCatchError(error: any): Observable<any> {
    if (error.status === 400 && error.error['username']) {
      this.isUserNameAlreadyTaken = true;
    } else if (error.status === 400 && error.error['password']) {
      this.isPasswordsMismatched = true;
    }
    this.isAddingUser = false;
    return of({});
  }

  public onRegisterButtonClick(): void {
    this.register(this.form.value);
  }

  public getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  private onUserAdded(user: AppUser): void {
    this.isAddingUser = false;
    this._toastr.success(
      `You are registered successfully. 
       Confirmation email was send to ${user.email}`
    );
    this._dialogRef.close();
  }

  get userName() {
    return this.form.get('userName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
