import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './landing-page.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class LandingPageRoutingModule {}
