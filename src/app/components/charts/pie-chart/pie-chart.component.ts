import { Component } from '@angular/core';
import { RepoService } from '../../../services/repo.service';
import {
  AccumulationAnnotationService,
  AccumulationChartModule,
  AccumulationDataLabelService,
  AccumulationLegendService,
  AccumulationTooltipService,
  PieSeriesService,
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  languages: string[] = ['java', 'javascript', 'python', 'php', 'ruby'];
  legendSettings?: Object;
  title?: string;
  pieData: Object[] = [];
  tooltip?: Object;

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.fetchRepoCounts();
  }

  fetchRepoCounts(): void {
    this.repoService.getRepoCounts(this.languages).subscribe({
      next: (response: any[]) => {
        this.pieData = response.map((repo) => ({
          x: repo.language,
          y: repo.count,
        }));
        console.log(this.pieData);
      },
      error: (error: any) => {
        console.error('Error fetching repository counts', error);
      },
    });

    this.title = 'Top 5 languages repository counts';
    this.tooltip = {
      enable: true,
    };
  }
}
