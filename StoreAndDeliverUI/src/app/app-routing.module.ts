import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth';
import { Roles } from './core/models/roles';
import { CargoRequestsComponent } from './features/cargo-requests/cargo-requests.component';
import { OptimizedCargoRequestsReviewComponent } from './features/cargo-requests/components/optimized-cargo-requests-review/optimized-cargo-requests-review.component';
import { UserRequestsComponent } from './features/cargo-requests/components/user-requests/user-requests.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'create-request',
        component: CargoRequestsComponent,
        data: {
          roles: [Roles.User],
        },
      },
      {
        path: 'optimized-requests',
        component: OptimizedCargoRequestsReviewComponent,
        data: {
          roles: [Roles.Carrier],
        },
      },
      {
        path: 'my-requests',
        component: UserRequestsComponent,
        data: {
          roles: [Roles.User],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
