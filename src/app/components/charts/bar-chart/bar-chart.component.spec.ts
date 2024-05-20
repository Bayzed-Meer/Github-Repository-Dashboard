import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { LanguageService } from '../../../services/language.service';
import { RepositoryService } from '../../../services/repository.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  let languageService: LanguageService;
  let repositoryService: RepositoryService;

  const mockApiResponse = {
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
      imports: [BarChartComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    repositoryService = TestBed.inject(RepositoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch languages on ngOnInit', () => {
    spyOn(component, 'fetchLanguages');
    component.ngOnInit();
    expect(component.fetchLanguages).toHaveBeenCalled();
  });

  it('should fetch repositories and set barChartData$ on searchTopTenRepositories', fakeAsync(() => {
    const language = 'TypeScript';
    const fetchRepositoriesSpy = spyOn(repositoryService, 'fetchRepositories').and.returnValue(of(mockApiResponse));
    component.selectedLanguage = language;
    component.searchTopTenRepositories();
    tick();
    expect(fetchRepositoriesSpy).toHaveBeenCalledWith(language, 'desc', 1, 10);
    expect(component.barChartData$).toBeDefined();
  }));
});
