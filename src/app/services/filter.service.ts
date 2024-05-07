import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { FilterOptions } from '../models/filter-options.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedLanguage$: BehaviorSubject<string> =
    new BehaviorSubject<string>('JavaScript');
  private order$: BehaviorSubject<string> = new BehaviorSubject<string>('desc');

  constructor() {}

  setFilters(language: string, order: string) {
    this.selectedLanguage$.next(language);
    this.order$.next(order);
  }

  getFilters(): Observable<FilterOptions> {
    return combineLatest([
      this.selectedLanguage$.asObservable(),
      this.order$.asObservable(),
    ]).pipe(
      map(([selectedLanguage, order]) => ({
        language: selectedLanguage,
        order: order,
      }))
    );
  }
}
