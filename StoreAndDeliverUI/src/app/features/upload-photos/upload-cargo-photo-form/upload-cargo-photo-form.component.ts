import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { UploadPhotoService } from '../services/upload-photo.service';

@Component({
  selector: 'app-upload-cargo-photo-form',
  templateUrl: './upload-cargo-photo-form.component.html',
  styleUrls: ['./upload-cargo-photo-form.component.scss'],
})
export class UploadCargoPhotoFormComponent implements OnInit {
  @Input() set cargoRequestId(cr: string) {
    this._cargoRequestId = cr;
  }
  get cargoRequestId(): string {
    return this._cargoRequestId;
  }
  private _cargoRequestId: string = '';

  public imageUploadForm: FormGroup = this._builder.group({});
  public progress: number = 0;
  public message: string = '';
  public messageCssClass = 'upload-success';

  constructor(
    private _builder: FormBuilder,
    private _translateService: TranslateService,
    private _uploadPhotoService: UploadPhotoService
  ) {}

  public ngOnInit(): void {
    this.imageUploadForm = this._builder.group({
      cargoPhoto: new FormControl(),
    });
  }

  public uploadFile(file: HTMLInputElement): void {
    let files = file.files || new FileList();
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();

    if (fileToUpload.type.split('/')[0] !== 'image') {
      this.message = this._translateService.instant(
        'cargoRequest.wrongFileType'
      );
      this.messageCssClass = 'upload-failed';
      this.clearMesssage();
      return;
    }

    formData.append('file', fileToUpload, this.getUniqueFileName(fileToUpload));
    this._uploadPhotoService
      .uploadCargoPhoto(this.cargoRequestId, formData)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          let total = event.total == undefined ? 100 : event.total;
          this.progress = Math.round((100 * event.loaded) / total);
        } else if (event.type === HttpEventType.Response) {
          if (event.body != null && event.body === true) {
            this.message = this._translateService.instant(
              'cargoRequest.uploadSuccess'
            );
            this.messageCssClass = 'upload-success';
          } else {
            this.message = this._translateService.instant(
              'common.unexpectedError'
            );
            this.progress = 0;
            this.messageCssClass = 'upload-failed';
          }
          this.clearMesssage();
        }
      });
  }

  private clearMesssage(): void {
    setTimeout(() => {
      this.message = '';
      this.progress = 0;
    }, 3000);
  }

  private getUniqueFileName(fileToUpload: File): string {
    let splitedFileNameWithFileFormat = fileToUpload.name
      .replace(' ', '_')
      .split('.')
      .filter((s) => s != '');
    let fileFormat =
      splitedFileNameWithFileFormat[splitedFileNameWithFileFormat.length - 1];
    splitedFileNameWithFileFormat.splice(-1, 1);

    let uniqueFileName =
      splitedFileNameWithFileFormat.join('.') +
      Guid.create() +
      '.' +
      fileFormat;
    return uniqueFileName;
  }
}
