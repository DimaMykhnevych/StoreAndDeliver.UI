import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../layout/material';
import { TranslateModule } from '@ngx-translate/core';
import { UploadCargoPhotoFormComponent } from './upload-cargo-photo-form/upload-cargo-photo-form.component';

@NgModule({
  declarations: [UploadCargoPhotoFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, TranslateModule],
  exports: [UploadCargoPhotoFormComponent],
})
export class UploadPhotosModule {}
