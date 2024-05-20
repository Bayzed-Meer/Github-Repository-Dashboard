import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RepositoryService } from '../../../services/repository.service';
import { LanguageService } from '../../../services/language.service';
import { PieChartComponent } from './pie-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { of } from 'rxjs';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let languageService: LanguageService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    repositoryService = TestBed.inject(RepositoryService)
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

  it('should fetch repository counts on searchRepositoryCounts', fakeAsync(() => {
    const languages = ['TypeScript', 'JavaScript'];
    const fetchRepositoriesSpy = spyOn(repositoryService, 'fetchRepositories').and.returnValue(of({ total_count: 100, items: []}));
    component.multiselect = { value: languages } as MultiSelectComponent;
    component.searchRepositoryCounts();
    tick(); 
    expect(fetchRepositoriesSpy).toHaveBeenCalledTimes(languages.length);
    expect(component.pieChartData$).toBeDefined();
  }));
});
