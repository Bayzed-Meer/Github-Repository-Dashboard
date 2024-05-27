import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';
import { Language } from '../../models/language.model';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let languageService: LanguageService;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    languageService = TestBed.inject(LanguageService);
    filterService = TestBed.inject(FilterService);

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchLanguages function on ngOnInit', () => {
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

  it('should call set correct filters', () => {
    const filterSpy = jest.spyOn(filterService, 'setFilters');
    const language = 'java';
    const sortOrder = 'desc';
    component.searchRepositories(language, sortOrder);
    expect(filterSpy).toHaveBeenCalledWith({ language, sortOrder });
  });
});
