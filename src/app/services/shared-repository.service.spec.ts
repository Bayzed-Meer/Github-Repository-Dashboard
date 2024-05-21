import { TestBed } from '@angular/core/testing';
import { SharedRepositoryService } from './shared-repository.service';
import { Repository } from '../models/repository.model';

describe('SharedRepositoryService', () => {
  let service: SharedRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get page number', () => {
    const pageNumber = 2;

    service.setPageNumber(pageNumber);

    service.getPageNumber().subscribe((result) => {
      expect(result).toEqual(pageNumber);
    });
  });

  it('should set and get repositories', () => {
    const mockRepositories: Repository[] = [
      { name: 'Repo 1', description: 'Description 1', language: 'JavaScript', stargazers_count: 100, forks_count: 50, updated_at: '2024-05-20', owner: { login: 'user1' }, html_url: 'https://github.com/repo1' },
      { name: 'Repo 2', description: 'Description 2', language: 'TypeScript', stargazers_count: 200, forks_count: 80, updated_at: '2024-05-19', owner: { login: 'user2' }, html_url: 'https://github.com/repo2' }
    ];

    service.setRepositories(mockRepositories);

    service.getRepositories().subscribe((result) => {
      expect(result).toEqual(mockRepositories);
    });
  });
});
