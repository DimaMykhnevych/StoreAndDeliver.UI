import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToHttpParams } from 'src/app/core/http/request/http-params.util';
import { AppSettings } from 'src/app/core/settings';
import { Logs } from '../models/logs';

interface GetLogs {
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient) {}

  public backupDatabase(): Observable<Blob> {
    return this._http.get(`${AppSettings.apiHost}/admin/backupDatabase`, {
      responseType: 'blob',
    });
  }

  public getLogs(date: Date): Observable<Logs> {
    const getObj: GetLogs = {
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    const httpParams: HttpParams = convertToHttpParams<GetLogs>(getObj);
    return this._http.get<Logs>(`${AppSettings.apiHost}/admin/getLogs`, {
      params: httpParams,
    });
  }
}
