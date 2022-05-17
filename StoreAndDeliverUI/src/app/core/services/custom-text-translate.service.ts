import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateResult } from '../models/translate-result';

@Injectable({
  providedIn: 'root',
})
export class CustomTextTranslateService {
  private translatorUrl: string =
    'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=';
  constructor(private _http: HttpClient) {}

  public translateText(text: string): Observable<TranslateResult[]> {
    let toLanguage = localStorage.getItem('language');
    if (toLanguage === 'ua') {
      toLanguage = 'uk';
    }
    const body: { Text: string }[] = [{ Text: text }];
    const headers = {
      'Ocp-Apim-Subscription-Key': `${environment.translatorApiKey}`,
    };
    return this._http.post<TranslateResult[]>(
      `${this.translatorUrl}${toLanguage}`,
      body,
      { headers: new HttpHeaders(headers) }
    );
  }
}
