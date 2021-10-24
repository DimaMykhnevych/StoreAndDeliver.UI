import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from '../material';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    RouterModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
