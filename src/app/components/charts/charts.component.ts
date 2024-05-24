import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BarChartComponent, PieChartComponent, RouterLink],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {}
