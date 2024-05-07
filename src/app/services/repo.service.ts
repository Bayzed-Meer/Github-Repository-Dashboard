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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RepoCount } from '../models/repository-count.model';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private baseUrl: string = 'https://api.github.com/search/repositories?';
  private repositories$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
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
        takeUntilDestroyed(),
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

  getRepoCounts(languages: string[]): Observable<RepoCount[]> {
    const requests: Observable<RepoCount>[] = languages.map((language) =>
      this.http.get<any>(this.baseUrl + `q=language:${language}`).pipe(
        map((response) => ({
          language: language,
          count: response.total_count,
        }))
      )
    );

    return forkJoin(requests);
  }

  fetchBarChartRepositories(language: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', 'desc');
    params = params.append('page', '1');
    params = params.append('per_page', '50');

    return this.http.get<any>(this.baseUrl, { params });
  }

  searchRepositories(language: string, order: string, page: number = 1): void {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', order);
    params = params.append('page', page.toString());
    params = params.append('per_page', '50');

    this.http.get<any>(this.baseUrl, { params }).subscribe((data) => {
      if (this.searchSource === 'filter') this.repositories$.next(data.items);
      else {
        const currentRepos = this.repositories$.getValue();
        this.repositories$.next([...currentRepos, ...data.items]);
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
    return this.repositories$.asObservable();
  }
}
