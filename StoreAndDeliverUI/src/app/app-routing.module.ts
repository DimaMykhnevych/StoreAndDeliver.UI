import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
