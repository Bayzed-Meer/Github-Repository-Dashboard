import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RepositoryService } from './repository.service';
import { GithubRepositoryAPIResponse } from '../models/repository.model';

describe('Repository Service', () => {
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories successfully', (done) => {
    const mockLanguage = 'JavaScript';
    const mockSortOrder = 'desc';
    const mockPageNumber = 1;
    const mockPageSize = 10;

    const mockResponse: GithubRepositoryAPIResponse = {
      total_count: 1,
      items: [
        {
          name: 'Repo 1',
          description: 'Description 1',
          language: 'JavaScript',
          stargazers_count: 100,
          forks_count: 50,
          updated_at: '2024-05-20',
          owner: { login: 'user1' },
          html_url: 'https://github.com/repo1',
        },
      ],
    };

    service
      .fetchRepositories(
        mockLanguage,
        mockSortOrder,
        mockPageNumber,
        mockPageSize
      )
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

    const req = httpMock.expectOne((request) =>
      request.url.startsWith('https://api.github.com/search/repositories?')
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe(`language:${mockLanguage}`);
    expect(req.request.params.get('sort')).toBe('stars');
    expect(req.request.params.get('order')).toBe(mockSortOrder);
    expect(req.request.params.get('page')).toBe(String(mockPageNumber));
    expect(req.request.params.get('per_page')).toBe(String(mockPageSize));

    req.flush(mockResponse);
  });
});
