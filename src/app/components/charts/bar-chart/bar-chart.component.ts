import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  LegendService,
  TooltipService,
} from '@syncfusion/ej2-angular-charts';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language.model';
import {
  GithubRepositoryAPIResponse,
  Repository,
} from '../../../models/repository.model';
import { RepositoryService } from '../../../services/repository.service';
import { Observable, catchError, map, of } from 'rxjs';
import { BarChartData } from '../../../models/bar-chart.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule, AutoCompleteModule, DropDownListModule, CommonModule],
  providers: [
    CategoryService,
    ColumnSeriesService,
    LegendService,
    TooltipService,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit {
  languages$!: Observable<string[]>;
  barChartData$!: Observable<BarChartData[]>;
  selectedLanguage: string = '';
  primaryYAxis!: Object;

  constructor(
    private repositoryService: RepositoryService,
    private languageService: LanguageService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.fetchLanguages();
  }

  fetchLanguages(): void {
    this.languages$ = this.languageService.fetchLanguages().pipe(
      map((languages: Language[]) =>
        languages.map((language) => language.name)
      ),
      catchError((error) => {
        console.log('Failed to fetch languages...');
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  fetchRepositories(language: string): void {
    this.barChartData$ = this.repositoryService
      .fetchRepositories(language, 'desc', 1, 10)
      .pipe(
        map((response: GithubRepositoryAPIResponse) => {
          const repositories: Repository[] = response.items;

          const maxStars: number = Math.max(
            ...repositories.map((repo: Repository) => repo.stargazers_count)
          );
          const maxForks: number = Math.max(
            ...repositories.map((repo: Repository) => repo.forks_count)
          );
          const maxYValue: number = Math.max(maxStars, maxForks);

          this.primaryYAxis = {
            minimum: 0,
            title: 'Forks',
            maximum: Math.round(maxYValue * (1 + 0.2)),
            interval: Math.round(maxYValue * 0.2),
          };
          return repositories.map((repo: Repository) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          }));
        }),
        catchError((error) => {
          console.log('Failed to fetch repository...');
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      );
  }
}
