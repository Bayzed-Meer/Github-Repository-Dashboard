import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { Filters } from '../models/filters.model';
import { take } from 'rxjs';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and filters', ()=> {
    const mockFilters: Filters = {
      language: 'Typescript',
      sortOrder: 'asc',
    }
    service.setFilters(mockFilters);
    service.getFilters().pipe(take(1)).subscribe(filters => expect(filters).toEqual(mockFilters))
  })
});
