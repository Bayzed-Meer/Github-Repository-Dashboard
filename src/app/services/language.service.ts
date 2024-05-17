import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageURL: string = 'https://api.github.com/languages';

  constructor(private http: HttpClient) {}

  fetchLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languageURL);
  }
}
