import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { MaterialModule } from '../material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { UploadPhotosModule } from 'src/app/features/upload-photos/upload-photos.module';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CdkAccordionModule,
    TranslateModule,
    SpinnerModule,
    UploadPhotosModule,
  ],
  exports: [AccordionComponent],
})
export class AccordionModule {}
