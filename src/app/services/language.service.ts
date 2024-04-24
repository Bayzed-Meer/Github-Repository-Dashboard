import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageAPI: string = 'https://api.github.com/languages';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get<any>(this.languageAPI);
  }
}
