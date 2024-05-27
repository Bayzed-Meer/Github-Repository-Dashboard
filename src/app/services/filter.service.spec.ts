import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { Filters } from '../models/filters.model';
import { tap } from 'rxjs';

describe('Filter Service', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get filters', () => {
    const mockFilters: Filters = {
      language: 'Java',
      sortOrder: 'desc',
    };

    service.setFilters(mockFilters);
    service
      .getFilters()
      .pipe(
        tap((filters) => {
          expect(filters).toEqual(mockFilters);
        })
      )
      .subscribe();
  });
});
