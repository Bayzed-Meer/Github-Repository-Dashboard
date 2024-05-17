import { TestBed } from '@angular/core/testing';

import { SharedRepositoryService } from './shared-repository.service';

describe('SharedRepositoryService', () => {
  let service: SharedRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
