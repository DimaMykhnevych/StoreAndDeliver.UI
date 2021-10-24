import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog/register-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openRegisterDialog(): MatDialogRef<RegisterDialogComponent> {
    return this.dialog.open(RegisterDialogComponent, {
      width: '550px',
      disableClose: true,
    });
  }

  public openLoginDialog(): MatDialogRef<LoginDialogComponent> {
    return this.dialog.open(LoginDialogComponent, {
      width: '300px',
      disableClose: true,
    });
  }
}
