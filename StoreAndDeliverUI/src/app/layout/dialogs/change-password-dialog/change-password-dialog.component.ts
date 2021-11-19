import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppUser } from 'src/app/core/models/app-user';
import { ChangeUserPassword } from '../models/change-user-password';
import { UserService } from '../register-dialog/services/user.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  public isChangingPassword: boolean = false;
  public isPasswordsMismatched: boolean = false;
  public isPasswordWeak: boolean = false;
  constructor(
    private _builder: FormBuilder,
    public _dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private _userService: UserService,
    private _translate: TranslateService,
    private _toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onChangePasswordButtonClick(): void {
    this.isChangingPassword = true;
    this.isPasswordsMismatched = false;
    this.isPasswordWeak = false;
    const changePasswordModel: ChangeUserPassword = this.form.value;

    this._userService
      .updatePassword(changePasswordModel)
      .pipe(
        catchError((error) => {
          return this.onCatchError(error);
        })
      )
      .subscribe((resp: AppUser) => {
        if (resp.id) {
          this.onSuccessfullPasswordChanging();
        }
      });
  }

  private onSuccessfullPasswordChanging(): void {
    this.isChangingPassword = false;
    this._translate
      .get('changePassword.successfulPasswordChangeToastr')
      .subscribe((resp: string) => {
        this.showSuccess(resp);
      });

    this._dialogRef.close();
  }

  private showSuccess(text: string): void {
    this._toastr.success(`${text}`);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  private onCatchError(error: any): Observable<any> {
    this.isPasswordsMismatched = true;
    this.isChangingPassword = false;
    return of({});
  }

  get password() {
    return this.form.get('password');
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
