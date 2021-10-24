import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
