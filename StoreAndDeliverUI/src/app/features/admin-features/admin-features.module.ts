import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/layout/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { DialogsModule } from 'src/app/layout/dialogs/dialogs.module';
import { CarrierManagementComponent } from './components/carrier-management/carrier-management.component';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';

@NgModule({
  declarations: [CarrierManagementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    DialogsModule,
    SpinnerModule,
  ],
})
export class AdminFeaturesModule {}
