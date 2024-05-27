import { Injectable } from '@angular/core';
import { Filters } from '../models/filters.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filters$: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({
    language: 'JavaScript',
    sortOrder: 'desc',
  });

  setFilters(filters: Filters): void {
    this.filters$.next(filters);
  }

  getFilters(): Observable<Filters> {
    return this.filters$.asObservable();
  }
}
