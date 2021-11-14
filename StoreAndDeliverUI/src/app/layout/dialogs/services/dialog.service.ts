import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Carrier } from 'src/app/core/models/carrier';
import { AddEditCarrierDialogComponent } from '../add-edit-carrier-dialog/add-edit-carrier-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog/login-dialog.component';
import { AddEditCarrierDialogData } from '../models/add-edit-dialog-data';
import { WarningDialogInfo } from '../models/warning-dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog/register-dialog.component';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';

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

  public openAddEditCarrierDialog(
    data: AddEditCarrierDialogData
  ): MatDialogRef<AddEditCarrierDialogComponent> {
    return this.dialog.open(AddEditCarrierDialogComponent, {
      width: '550px',
      disableClose: true,
      data: data,
    });
  }

  public openWarningDialog(
    data: WarningDialogInfo
  ): MatDialogRef<WarningDialogComponent> {
    return this.dialog.open(WarningDialogComponent, {
      width: '390px',
      disableClose: false,
      data: data,
    });
  }
}
