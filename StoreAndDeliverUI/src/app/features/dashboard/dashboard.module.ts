import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layout/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreModule, MaterialModule, TranslateModule],
})
export class DashboardModule {}
