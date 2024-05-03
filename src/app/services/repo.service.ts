import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  forkJoin,
  map,
} from 'rxjs';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private baseUrl: string = 'https://api.github.com/search/repositories?';
  private repositoriesSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  searchSource: string = 'filter';

  private currentPage: number = 1;
  private currentLanguage: string = '';
  private currentOrder: string = '';

  constructor(private http: HttpClient, private filterService: FilterService) {
    this.fetchFilters();
  }

  fetchFilters(): void {
    this.filterService
      .getFilters()
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.language === curr.language && prev.order === curr.order;
        })
      )
      .subscribe((filters) => {
        this.currentLanguage = filters.language;
        this.currentOrder = filters.order;
        this.searchSource = 'filter';
        this.currentPage = 1;

        this.searchRepositories(
          this.currentLanguage,
          this.currentOrder,
          this.currentPage
        );
      });
  }

  getRepoCounts(languages: string[]): Observable<any[]> {
    const requests: Observable<any>[] = languages.map((language) =>
      this.http.get<any>(this.baseUrl + `q=language:${language}`).pipe(
        map((response) => ({
          language: language,
          count: response.total_count,
        }))
      )
    );

    return forkJoin(requests);
  }

  fetchRepositories(language: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', 'desc');
    params = params.append('page', '1');
    params = params.append('per_page', '10');

    return this.http.get<any>(this.baseUrl, { params });
  }

  searchRepositories(language: string, order: string, page: number = 1): void {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', order);
    params = params.append('page', page.toString());
    params = params.append('per_page', '50');

    console.log('search called from:', this.searchSource);
    console.log(this.baseUrl + params);

    this.http.get<any>(this.baseUrl, { params }).subscribe((data) => {
      if (this.searchSource === 'filter')
        this.repositoriesSubject.next(data.items);
      else {
        const currentRepos = this.repositoriesSubject.getValue();
        this.repositoriesSubject.next([...currentRepos, ...data.items]);
      }
    });
  }

  fetchNextPage(): void {
    this.currentPage++;
    this.searchSource = 'fetchNextPage';
    this.searchRepositories(
      this.currentLanguage,
      this.currentOrder,
      this.currentPage
    );
  }

  getRepositories(): Observable<any[]> {
    return this.repositoriesSubject.asObservable();
  }
}
