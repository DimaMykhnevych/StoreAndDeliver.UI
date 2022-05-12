import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class UploadPhotoService {
  constructor(private _http: HttpClient) {}

  public uploadCargoPhoto(
    cargoRequestId: string,
    formData: FormData
  ): Observable<HttpEvent<boolean>> {
    return this._http.post<boolean>(
      `${AppSettings.apiHost}/cargoRequest/uploadCargoPhoto/${cargoRequestId}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
