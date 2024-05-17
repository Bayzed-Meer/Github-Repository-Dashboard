import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class SharedRepositoryService {
  private pageNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private repositories$: BehaviorSubject<Repository[]> = new BehaviorSubject<
    Repository[]
  >([]);

  setPageNumber(pageNumber: number): void {
    this.pageNumber$.next(pageNumber);
  }

  setRepositories(repositories: Repository[]): void {
    this.repositories$.next(repositories);
  }

  getPageNumber(): Observable<number> {
    return this.pageNumber$.asObservable();
  }

  getRepositories(): Observable<Repository[]> {
    return this.repositories$.asObservable();
  }
}
