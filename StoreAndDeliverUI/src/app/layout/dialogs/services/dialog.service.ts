import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargoPhoto } from 'src/app/core/models/cargo-photo';
import { CargoSnapshot } from 'src/app/core/models/cargo-snapshot';
import { Carrier } from 'src/app/core/models/carrier';
import { AddEditCarrierDialogComponent } from '../add-edit-carrier-dialog/add-edit-carrier-dialog.component';
import { AddEditStoreDialogComponent } from '../add-edit-store-dialog/add-edit-store-dialog.component';
import { CargoSnapshotsDialogComponent } from '../cargo-snapshots-dialog/cargo-snapshots-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog/login-dialog.component';
import { AddEditCarrierDialogData } from '../models/add-edit-dialog-data';
import { AddEditStoreDialogData } from '../models/add-edit-store-data';
import { WarningDialogInfo } from '../models/warning-dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog/register-dialog.component';
import { ShowPhotosDialogComponent } from '../show-photos-dialog/show-photos-dialog.component';
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

  public openChangePasswordDialog(): MatDialogRef<ChangePasswordDialogComponent> {
    return this.dialog.open(ChangePasswordDialogComponent, {
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

  public openCargoSnapshotsDialog(
    data: CargoSnapshot[]
  ): MatDialogRef<CargoSnapshotsDialogComponent> {
    return this.dialog.open(CargoSnapshotsDialogComponent, {
      width: '400px',
      disableClose: false,
      data: data,
    });
  }

  public openAddEditStoreDialog(
    data: AddEditStoreDialogData
  ): MatDialogRef<AddEditStoreDialogComponent> {
    return this.dialog.open(AddEditStoreDialogComponent, {
      width: '600px',
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

  public openShowPhotosDialog(data: CargoPhoto[]) {
    return this.dialog.open(ShowPhotosDialogComponent, {
      width: '600px',
      disableClose: false,
      data: data,
    });
  }
}
