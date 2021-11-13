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

@NgModule({
  declarations: [RegisterDialogComponent, LoginDialogComponent, WarningDialogComponent],
  imports: [
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
