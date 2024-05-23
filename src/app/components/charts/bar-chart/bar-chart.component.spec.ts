import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { LanguageService } from '../../../services/language.service';
import { RepositoryService } from '../../../services/repository.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubRepositoryAPIResponse } from '../../../models/repository.model';

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
      }
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

  it('should fetch repositories and set barChartData$ on searchTopTenRepositories', fakeAsync(() => {
    const language = 'TypeScript';
    const fetchRepositoriesSpy = jest.spyOn(repositoryService, 'fetchRepositories').mockReturnValue(of(mockApiResponse));
    component.selectedLanguage = language;
    component.searchTopTenRepositories();
    tick();
    expect(fetchRepositoriesSpy).toHaveBeenCalledWith(language, 'desc', 1, 10);
    expect(component.barChartData$).toBeDefined();
  }));
});
