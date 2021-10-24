import { Route } from '@angular/router';
import { EmailConfirmationComponent } from '../../email-confirmation/email-confirmation/email-confirmation.component';
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
  {
    path: 'emailConfirmation',
    component: EmailConfirmationComponent,
  },
];
