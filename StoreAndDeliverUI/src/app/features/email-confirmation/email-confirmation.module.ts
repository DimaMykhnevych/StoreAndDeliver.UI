import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MaterialModule } from 'src/app/layout/material';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [EmailConfirmationComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
})
export class EmailConfirmationModule {}
