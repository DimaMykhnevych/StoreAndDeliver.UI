import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CargoPhoto } from 'src/app/core/models/cargo-photo';

@Component({
  selector: 'app-show-photos-dialog',
  templateUrl: './show-photos-dialog.component.html',
  styleUrls: ['./show-photos-dialog.component.scss'],
})
export class ShowPhotosDialogComponent implements OnInit {
  public cargoPhotos: CargoPhoto[];
  public currentPhoto: CargoPhoto;
  public currentIndex = 0;
  public photosAmount;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: CargoPhoto[],
    private datePipe: DatePipe
  ) {
    this.cargoPhotos = data;
    this.currentPhoto = data[0];
    this.photosAmount = data.length;
    if (this.cargoPhotos.length === 0) {
      this.currentIndex = -1;
    }
  }

  public ngOnInit(): void {}

  public onNextButtonClick(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.cargoPhotos.length) {
      this.currentIndex = 0;
    }
    this.currentPhoto = this.cargoPhotos[this.currentIndex];
  }

  public onPreviousButtonClick(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.cargoPhotos.length - 1;
    }
    this.currentPhoto = this.cargoPhotos[this.currentIndex];
  }

  public getDateFormat(date: Date | undefined): string {
    const currentLanguage = localStorage.getItem('language');
    switch (currentLanguage) {
      case 'ua':
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
      case 'ru':
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
      case 'en':
      default:
        return this.datePipe.transform(date, 'MM/dd/yyyy HH:mm') || '';
    }
  }
}
