import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterService } from '../../services/filter.service';
import { Observable, combineLatest, map, switchMap, take, tap } from 'rxjs';
import { Repository } from '../../models/repository.model';
import { RepositoryService } from '../../services/repository.service';
import { SharedRepositoryService } from '../../services/shared-repository.service';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid/grid.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  showCard: boolean = true;
  repositories$!: Observable<Repository[]>;
  pageSize: number = 50;

  constructor(
    private repositoryService: RepositoryService,
    private filterService: FilterService,
    private sharedRepositoryService: SharedRepositoryService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.repositories$ = this.sharedRepositoryService.getRepositories();
    this.repositories$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        take(1),
        tap((repositories) => {
          if (repositories.length === 0) this.fetchRepositories();
        })
      )
      .subscribe();
  }

  fetchRepositories(): void {
    combineLatest([
      this.sharedRepositoryService.getPageNumber(),
      this.filterService.getFilters(),
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(([pageNumber, filters]) =>
          this.repositoryService
            .fetchRepositories(
              filters.language,
              filters.sortOrder,
              pageNumber,
              this.pageSize
            )
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              tap((repos) => {
                if (pageNumber === 1) {
                  this.sharedRepositoryService.setRepositories(repos.items);
                  if (this.dataContainer)
                    this.dataContainer.nativeElement.scrollTop = 0;
                } else {
                  this.sharedRepositoryService
                    .getRepositories()
                    .pipe(
                      takeUntilDestroyed(this.destroyRef),
                      take(1),
                      map((existingRepos) => [
                        ...existingRepos,
                        ...repos.items,
                      ]),
                      tap((updatedRepos) =>
                        this.sharedRepositoryService.setRepositories(
                          updatedRepos
                        )
                      )
                    )
                    .subscribe();
                }
              })
            )
        )
      )
      .subscribe();
  }

  loadMoreRepositories(): void {
    this.sharedRepositoryService
      .getPageNumber()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        take(1),
        tap((pageNumber) =>
          this.sharedRepositoryService.setPageNumber(pageNumber + 1)
        )
      )
      .subscribe();
  }

  toggleView(): void {
    this.showCard = !this.showCard;
  }
}
