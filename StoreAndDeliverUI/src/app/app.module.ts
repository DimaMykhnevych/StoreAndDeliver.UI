import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './layout/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageModule } from './features/landing-page/landing-page.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { DialogsModule } from './layout/dialogs/dialogs.module';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerModule } from './layout/spinner/spinner.module';
import { EmailConfirmationModule } from './features/email-confirmation/email-confirmation.module';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './layout/navbar/navbar.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { CargoRequestsModule } from './features/cargo-requests/cargo-requests.module';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { AdminFeaturesModule } from './features/admin-features/admin-features.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    LandingPageModule,
    CoreModule,
    DialogsModule,
    SpinnerModule,
    RouterModule,
    NavbarModule,
    DashboardModule,
    CargoRequestsModule,
    EmailConfirmationModule,
    SidenavModule,
    AdminFeaturesModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
