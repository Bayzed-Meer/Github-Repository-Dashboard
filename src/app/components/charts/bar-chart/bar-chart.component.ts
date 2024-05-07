import { Component, OnInit } from '@angular/core';
import {
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  LegendService,
  TooltipService,
} from '@syncfusion/ej2-angular-charts';
import { RepoService } from '../../../services/repo.service';
import { CommonModule } from '@angular/common';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language.model';

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
})
export class BarChartComponent implements OnInit {
  title: string = 'Top 10 Repositories Comparison of Stars and Forks';
  Languagedata: string[] = [];
  selectedLanguage: string = 'Javascript';
  palette: string[] = ['#ec4899', '#9333ea'];
  chartData?: Object[];
  tooltip: Object = { enable: true };
  primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Stars',
  };
  primaryYAxis?: Object;

  constructor(
    private repoService: RepoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.fetchRepositories();
    this.fetchLanguages();
  }

  fetchRepositories(): void {
    this.repoService
      .fetchBarChartRepositories(this.selectedLanguage)
      .subscribe((newRepos: any) => {
        const top10Repos = newRepos.items.slice(0, 10);

        top10Repos.sort(
          (a: any, b: any) => a.stargazers_count - b.stargazers_count
        );

        const maxStars = Math.max(
          ...top10Repos.map((repo: any) => repo.stargazers_count)
        );
        const maxForks = Math.max(
          ...top10Repos.map((repo: any) => repo.forks_count)
        );

        const maxYValue = Math.max(maxStars, maxForks);

        this.primaryYAxis = {
          minimum: 0,
          maximum: maxYValue + 30000,
          interval: 20000,
        };

        this.chartData = top10Repos.map(
          (repo: { name: any; stargazers_count: any; forks_count: any }) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          })
        );
      });
  }

  fetchLanguages() {
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        this.Languagedata = data.map((item: Language) => item.name);
      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      },
    });
  }

  onSearch(): void {
    this.fetchRepositories();
  }
}
