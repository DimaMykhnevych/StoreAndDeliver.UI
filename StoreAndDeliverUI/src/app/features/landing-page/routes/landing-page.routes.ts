import { Route } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
];
