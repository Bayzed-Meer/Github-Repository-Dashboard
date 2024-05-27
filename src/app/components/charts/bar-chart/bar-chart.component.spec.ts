import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { LanguageService } from '../../../services/language.service';
import { RepositoryService } from '../../../services/repository.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubRepositoryAPIResponse } from '../../../models/repository.model';
import { Language } from '../../../models/language.model';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  let languageService: LanguageService;
  let repositoryService: RepositoryService;

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
      imports: [HttpClientTestingModule, BarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;

    languageService = TestBed.inject(LanguageService);
    repositoryService = TestBed.inject(RepositoryService);

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch languages on ngOnInit', () => {
    const fetchLanguagesSpy = jest.spyOn(component, 'fetchLanguages');
    component.ngOnInit();
    expect(fetchLanguagesSpy).toHaveBeenCalled();
  });

  it('should fetch languages successfully', (done) => {
    const mockData: Language[] = [{ name: 'java' }];
    jest.spyOn(languageService, 'fetchLanguages').mockReturnValue(of(mockData));
    component.fetchLanguages();
    component.languages$.subscribe((languages) => {
      expect(languages).toEqual(['java']);
      done();
    });
  });

  it('should handle error when fetching languages', (done) => {
    const mockError = new Error('Failed to fetch languages...');
    jest
      .spyOn(languageService, 'fetchLanguages')
      .mockReturnValue(throwError(() => mockError));
    component.fetchLanguages();
    component.languages$.subscribe((languagues) => {
      expect(languagues).toEqual([]);
      done();
    });
  });

  it('should fetch repositories and set barChartData$', () => {
    const language = 'TypeScript';
    const fetchRepositoriesSpy = jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(of(mockApiResponse));
    component.fetchRepositories(language);
    expect(fetchRepositoriesSpy).toHaveBeenCalledWith(language, 'desc', 1, 10);
    expect(component.barChartData$).toBeDefined();
  });

  it('should handle error when fetching repositories', (done) => {
    const mockError = new Error('Failed to fetch repository...');
    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(throwError(() => mockError));

    component.fetchRepositories('JavaScript');
    component.barChartData$.subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });
});
