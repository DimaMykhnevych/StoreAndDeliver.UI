import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDialogComponent } from './register-dialog/register-dialog/register-dialog.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { LoginDialogComponent } from './login-dialog/login-dialog/login-dialog.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { AddEditCarrierDialogComponent } from './add-edit-carrier-dialog/add-edit-carrier-dialog.component';
import { AddEditStoreDialogComponent } from './add-edit-store-dialog/add-edit-store-dialog.component';
import { CargoRequestsModule } from 'src/app/features/cargo-requests/cargo-requests.module';
import { CargoSnapshotsDialogComponent } from './cargo-snapshots-dialog/cargo-snapshots-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ShowPhotosDialogComponent } from './show-photos-dialog/show-photos-dialog.component';

@NgModule({
  declarations: [
    RegisterDialogComponent,
    LoginDialogComponent,
    WarningDialogComponent,
    AddEditCarrierDialogComponent,
    AddEditStoreDialogComponent,
    CargoSnapshotsDialogComponent,
    ChangePasswordDialogComponent,
    ShowPhotosDialogComponent,
  ],
  imports: [
    CargoRequestsModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    SpinnerModule,
    AppRoutingModule,
    TranslateModule,
  ],
})
export class DialogsModule {}
