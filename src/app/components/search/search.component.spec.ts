import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';

xdescribe('SearchComponent', () => {
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

  it('should fetch languages on ngOnInit', () => {
    const fetchLanguagesSpy = jest.spyOn(component, 'fetchLanguages');
    component.ngOnInit();
    expect(fetchLanguagesSpy).toHaveBeenCalled();
  });
});
