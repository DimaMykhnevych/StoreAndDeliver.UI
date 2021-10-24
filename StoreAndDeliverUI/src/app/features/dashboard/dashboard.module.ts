import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layout/material';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreModule, MaterialModule],
})
export class DashboardModule {}
