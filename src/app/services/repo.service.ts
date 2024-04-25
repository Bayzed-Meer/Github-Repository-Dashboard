import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private baseUrl = 'https://api.github.com/search/repositories';
  private repositoriesSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

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
        this.searchRepositories(filters.language, filters.order, 1, 50);
      });
  }

  searchRepositories(
    language: string,
    order: string,
    page: number,
    perPage: number
  ): void {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', order);
    params = params.append('page', page.toString());
    params = params.append('per_page', perPage.toString());

    console.log('search called');

    this.http.get<any>(this.baseUrl, { params }).subscribe((data) => {
      this.repositoriesSubject.next(data.items);
    });
  }

  getRepositories(): Observable<any[]> {
    return this.repositoriesSubject.asObservable();
  }
}
