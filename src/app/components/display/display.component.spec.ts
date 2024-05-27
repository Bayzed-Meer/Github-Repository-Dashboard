import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayComponent } from './display.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RepositoryService } from '../../services/repository.service';
import { FilterService } from '../../services/filter.service';
import { GithubRepositoryAPIResponse } from '../../models/repository.model';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  let repositoryService: RepositoryService;
  let filterService: FilterService;

  const mockApiResponse: GithubRepositoryAPIResponse = {
    total_count: 100,
    items: [
      {
        name: 'Repo 1',
        description: 'Sample description',
        language: 'TypeScript',
        stargazers_count: 100,
        forks_count: 50,
        updated_at: '2024-05-20',
        owner: {
          login: 'owner1',
        },
        html_url: 'https://github.com/repo1',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;

    repositoryService = TestBed.inject(RepositoryService);
    filterService = TestBed.inject(FilterService);

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories oninit', () => {
    jest.spyOn(component, 'fetchRepositories');
    component.ngOnInit();
    expect(component.fetchRepositories).toHaveBeenCalled();
  });

  it('should assign repositories correctly', (done) => {
    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(of(mockApiResponse));

    component.fetchRepositories$.next();

    component.fetchRepositories$.subscribe(() => {
      expect(component.repositories.length).toBe(1);
      done();
    });
  });

  it('should handle error when fetching repositories', (done) => {
    const mockError = new Error('Failed to fetch repositories...');
    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(throwError(() => mockError));

    component.fetchRepositories$.next();

    expect(component.repositories).toEqual([]);
    done();
  });
});
