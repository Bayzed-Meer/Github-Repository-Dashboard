import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Language } from '../models/language.model';

describe('LanguageService', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch languages', () => {
    const mockLanguages: Language[] = [
      { name: 'JavaScript' }
    ];

    service.fetchLanguages().subscribe(languages => {
      expect(languages).toEqual(mockLanguages);
    });

    const req = httpMock.expectOne('https://api.github.com/languages');
    expect(req.request.method).toBe('GET');

    req.flush(mockLanguages);
  });
});
