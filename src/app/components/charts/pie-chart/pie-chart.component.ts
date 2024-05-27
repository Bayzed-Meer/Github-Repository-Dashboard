import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MultiSelectComponent,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  AccumulationAnnotationService,
  AccumulationChartModule,
  AccumulationDataLabelService,
  AccumulationLegendService,
  AccumulationTooltipService,
  PieSeriesService,
} from '@syncfusion/ej2-angular-charts';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language.model';
import { RepositoryService } from '../../../services/repository.service';
import { PieChartData } from '../../../models/pie-chart.model';
import { GithubRepositoryAPIResponse } from '../../../models/repository.model';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    AccumulationChartModule,
    AutoCompleteModule,
    DropDownListModule,
    MultiSelectModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  @ViewChild('multiselect') multiselect!: MultiSelectComponent;

  languages$!: Observable<string[]>;
  pieChartData$!: Observable<PieChartData[]>;
  selectionLimit: number = 3;

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
        console.error('Failed to fetch languages...', error);
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private fetchRepositoryCounts(
    languages: string[],
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ): void {
    const languageCount$: Observable<PieChartData>[] = languages.map(
      (language: string) =>
        this.repositoryService
          .fetchRepositories(language, sortOrder, pageNumber, pageSize)
          .pipe(
            map((response: GithubRepositoryAPIResponse) => ({
              language,
              count: response.total_count,
            })),
            catchError((error) => {
              console.error(`Failed to fetch repositories ...`, error);
              return of({ language, count: 0 });
            }),
            takeUntilDestroyed(this.destroyRef)
          )
    );

    this.pieChartData$ = forkJoin(languageCount$).pipe(
      map((results: PieChartData[]) => {
        return results.filter(({ count }) => count > 0);
      }),
      catchError((error) => {
        console.error('Failed to fetch repository counts...', error);
        return of([]);
      })
    );
  }

  searchRepositoryCounts(): void {
    const selectedLanguages = this.multiselect.value as string[];
    if (selectedLanguages)
      this.fetchRepositoryCounts(selectedLanguages, 'desc', 1, 1);
  }
}
