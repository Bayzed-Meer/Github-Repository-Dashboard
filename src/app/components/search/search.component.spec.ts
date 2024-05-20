import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';
import { SharedRepositoryService } from '../../services/shared-repository.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let languageService: LanguageService;
  let filterService: FilterService;
  let sharedRepositoryService: SharedRepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    filterService = TestBed.inject(FilterService);
    sharedRepositoryService = TestBed.inject(SharedRepositoryService);
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

  it('should call filter service with correct parameters when searchRepositories is called', () => {
    spyOn(sharedRepositoryService, 'setPageNumber');
    spyOn(filterService, 'setFilters');

    const language = 'Python';
    const sortOrder = 'asc';
    component.searchRepositories(language, sortOrder);

    expect(sharedRepositoryService.setPageNumber).toHaveBeenCalledWith(1);
    expect(filterService.setFilters).toHaveBeenCalledWith({ language, sortOrder });
  });
});
