import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { MaterialModule } from 'src/app/layout/material';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { CargoRequestsComponent } from './cargo-requests.component';

@NgModule({
  declarations: [
    CargoRequestsComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
  ],
})
export class CargoRequestsModule {}
