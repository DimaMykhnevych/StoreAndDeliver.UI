import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { MaterialModule } from '../material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CdkAccordionModule,
    TranslateModule,
    SpinnerModule,
  ],
  exports: [AccordionComponent],
})
export class AccordionModule {}
