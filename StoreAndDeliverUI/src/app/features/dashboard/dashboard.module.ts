import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layout/material';
import { TranslateModule } from '@ngx-translate/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CargoRequestsModule } from '../cargo-requests/cargo-requests.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    SpinnerModule,
    CargoRequestsModule,
  ],
})
export class DashboardModule {}
