import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedLanguageSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('javaScript');
  private orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    'desc'
  );

  constructor() {}

  setFilters(language: string, order: string) {
    this.selectedLanguageSubject.next(language);
    this.orderSubject.next(order);
  }

  getFilters(): Observable<any> {
    return combineLatest([
      this.selectedLanguageSubject.asObservable(),
      this.orderSubject.asObservable(),
    ]).pipe(
      map(([selectedLanguage, order]) => ({
        language: selectedLanguage,
        order: order,
      }))
    );
  }
}
