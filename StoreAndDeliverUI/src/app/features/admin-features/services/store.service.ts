import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'src/app/core/models/store';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private _http: HttpClient) {}

  public getStores(): Observable<Store[]> {
    return this._http.get<Store[]>(`${AppSettings.apiHost}/store`);
  }

  public addStore(store: Store): Observable<Store> {
    return this._http.post<Store>(`${AppSettings.apiHost}/store`, store);
  }

  public deleteStore(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${AppSettings.apiHost}/store/${id}`);
  }
}
