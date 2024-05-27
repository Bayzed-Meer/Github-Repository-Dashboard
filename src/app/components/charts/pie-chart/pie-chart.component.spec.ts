import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryService } from '../../../services/repository.service';
import { LanguageService } from '../../../services/language.service';
import { PieChartComponent } from './pie-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Language } from '../../../models/language.model';
import { GithubRepositoryAPIResponse } from '../../../models/repository.model';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  let languageService: LanguageService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PieChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
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

  it('should fetch and assign repository counts correctly', (done) => {
    const mockResponse: GithubRepositoryAPIResponse = {
      items: [],
      total_count: 42,
    };

    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(of(mockResponse));

    component.fetchRepositoryCounts(['JavaScript', 'Python'], 'desc', 1, 1);

    component.pieChartData$.subscribe((data) => {
      expect(data).toEqual([
        { language: 'JavaScript', count: 42 },
        { language: 'Python', count: 42 },
      ]);
      done();
    });
  });

  it('should handle error when fetching repository counts', (done) => {
    const mockError = new Error('Failed to fetch repository...');
    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(throwError(() => mockError));

    component.fetchRepositoryCounts(['JavaScript'], 'desc', 1, 1);

    component.pieChartData$.subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });
});
