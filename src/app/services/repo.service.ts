import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private baseUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  searchRepositories(
    language: string,
    order: string,
    page: number,
    perPage: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('q', `language:${language}`);
    params = params.append('sort', 'stars');
    params = params.append('order', order);
    params = params.append('page', page.toString());
    params = params.append('per_page', perPage.toString());
    console.log(language, order);

    return this.http.get<any>(this.baseUrl, { params });
  }
}
