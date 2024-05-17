import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubRepositoryAPIResponse } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private baseURL: string = 'https://api.github.com/search/repositories?';

  constructor(private http: HttpClient) {}

  fetchRepositories(
    language: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ): Observable<GithubRepositoryAPIResponse> {
    const params = new HttpParams()
      .set('q', `language:${language}`)
      .set('sort', 'stars')
      .set('order', sortOrder)
      .set('page', String(pageNumber))
      .set('per_page', String(pageSize));

    return this.http.get<GithubRepositoryAPIResponse>(this.baseURL, { params });
  }
}
