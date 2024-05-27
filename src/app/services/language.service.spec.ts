import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
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

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch languages', (done) => {
    const mockLanguages: Language[] = [{ name: 'java' }];
    service.fetchLanguages().subscribe((languages) => {
      expect(languages).toEqual(mockLanguages);
      done();
    });
    const req = httpMock.expectOne('https://api.github.com/languages');
    expect(req.request.method).toBe('GET');
    req.flush(mockLanguages);
  });
});
