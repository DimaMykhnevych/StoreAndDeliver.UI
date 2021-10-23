import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/layout/material';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageRoutingModule } from './routes/landing-page-routnig.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    LandingPageRoutingModule,
    TranslateModule,
  ],
})
export class LandingPageModule {}
