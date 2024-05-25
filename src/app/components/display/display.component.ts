import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterService } from '../../services/filter.service';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { Repository } from '../../models/repository.model';
import { RepositoryService } from '../../services/repository.service';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid/grid.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Filters } from '../../models/filters.model';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, SearchComponent, CardComponent, GridComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  @ViewChild('dataContainer') dataContainer!: ElementRef<HTMLDivElement>;

  repositories: Repository[] = [];
  showCard: boolean = true;
  fetchRepositories$ = new BehaviorSubject<void>(undefined);
  pageSize: number = 50;
  pageNumber: number = 1;
  currentFilters: Filters = {
    language: '',
    sortOrder: '',
  };

  constructor(
    private repositoryService: RepositoryService,
    private filterService: FilterService,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchRepositories$
      .pipe(
        switchMap(() => this.filterService.getFilters()),
        tap((filters: Filters) => {
          if (
            filters.language !== this.currentFilters.language ||
            filters.sortOrder !== this.currentFilters.sortOrder
          ) {
            this.currentFilters.language = filters.language;
            this.currentFilters.sortOrder = filters.sortOrder;
            this.pageNumber = 1;
            this.dataContainer
              ? this.dataContainer.nativeElement.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              : undefined;
          } else this.pageNumber = this.pageNumber + 1;
        }),
        switchMap((filters: Filters) =>
          this.repositoryService.fetchRepositories(
            filters.language,
            filters.sortOrder,
            this.pageNumber,
            this.pageSize
          )
        ),
        map((repos) =>
          this.pageNumber === 1
            ? repos.items
            : [...this.repositories, ...repos.items]
        ),
        tap((repos) => {
          this.repositories = repos;
          this.cdr.detectChanges();
        }),
        catchError((error) => {
          console.error('Failed to fetch repositories...', error);
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  loadMoreRepositories(): void {
    this.fetchRepositories$.next();
  }

  toggleView(): void {
    this.showCard = !this.showCard;
  }
}
