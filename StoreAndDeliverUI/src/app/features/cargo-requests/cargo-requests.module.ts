import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { MaterialModule } from 'src/app/layout/material';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { CargoRequestsComponent } from './cargo-requests.component';
import { RequestTypeFormComponent } from './forms/request-type-form/request-type-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestTypeFormContainerComponent } from './containers/request-type-form-container/request-type-form-container.component';
import { RequestDetailsFormContainerComponent } from './containers/request-details-form-container/request-details-form-container.component';
import { RequestDetailsFormComponent } from './forms/request-details-form/request-details-form.component';
import { AddressFormComponent } from './forms/address-form/address-form.component';
import { CargoFormComponent } from './forms/cargo-form/cargo-form.component';
import { CargoFormContainerComponent } from './containers/cargo-form-container/cargo-form-container.component';
import { IndicatorsSetupContainerComponent } from './containers/indicators-setup-container/indicators-setup-container.component';
import { IndicatorsSetupFormComponent } from './forms/indicators-setup-form/indicators-setup-form.component';
import { IndicatorItemFormComponent } from './forms/indicator-item-form/indicator-item-form.component';
import { UnitSelectionFormComponent } from './forms/unit-selection-form/unit-selection-form.component';
import { OptimizedCargoRequestsReviewComponent } from './components/optimized-cargo-requests-review/optimized-cargo-requests-review.component';
import { GroupedCargoItemComponent } from './components/grouped-cargo-item/grouped-cargo-item.component';
import { CargoRequestItemComponent } from './components/cargo-request-item/cargo-request-item.component';
import { AccordionModule } from 'src/app/layout/accordion/accordion.module';
import { UnitsPanelComponent } from './components/units-panel/units-panel.component';
import { FormsModule } from '@angular/forms';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';

@NgModule({
  declarations: [
    CargoRequestsComponent,
    RequestTypeFormComponent,
    RequestTypeFormContainerComponent,
    RequestDetailsFormContainerComponent,
    RequestDetailsFormComponent,
    AddressFormComponent,
    CargoFormComponent,
    CargoFormContainerComponent,
    IndicatorsSetupContainerComponent,
    IndicatorsSetupFormComponent,
    IndicatorItemFormComponent,
    UnitSelectionFormComponent,
    OptimizedCargoRequestsReviewComponent,
    GroupedCargoItemComponent,
    CargoRequestItemComponent,
    UnitsPanelComponent,
    UserRequestsComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    AccordionModule,
    FormsModule,
  ],
  exports: [AddressFormComponent, CargoRequestItemComponent],
  providers: [DatePipe],
})
export class CargoRequestsModule {}
